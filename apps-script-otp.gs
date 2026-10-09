/**
 * TEONOX Phone OTP backend (MagicText) — standalone Google Apps Script.
 * ---------------------------------------------------------------------------
 * WHY THIS EXISTS: the main site is served as static files, so the Express
 * /api/send-otp endpoints in server.ts never receive browser traffic on
 * production. This script runs the SAME OTP flow on Google's servers, which
 * the static site CAN reach (same pattern as the existing lead webhook).
 *
 * DEPLOY STEPS (5 minutes, done once):
 *  1. Go to https://script.google.com → New project → paste this WHOLE file
 *     (it is self-contained; do NOT mix it into the leads script).
 *  2. Project Settings (gear icon) → Script Properties → Add these 5:
 *       MAGICTEXT_API_URL   = http://panel.magictext.in/http-tokenkeyapi.php
 *       MAGICTEXT_AUTH_KEY  = <your authentic-key>
 *       MAGICTEXT_SENDER_ID = <your senderid, e.g. Teonox>
 *       MAGICTEXT_ROUTE     = <your route, e.g. 1>
 *       MAGICTEXT_TEMPLATE_ID = <your DLT template id>
 *  3. Deploy → New deployment → type "Web app", Execute as: Me,
 *     "Who has access": Anyone → Deploy → copy the /exec URL.
 *  4. On the website server .env set:
 *       VITE_OTP_API_URL="https://script.google.com/macros/s/<...>/exec"
 *     then run `npm run build` (Vite bakes VITE_* vars at build time)
 *     and restart/redeploy the frontend.
 *
 * API (JSONP GET — script tags follow the Apps Script redirect, plain
 * fetch() cannot read it due to CORS):
 *   ?action=sendOtp&phone=9876543210&callback=cb
 *     → cb({ok:true})
 *     → cb({ok:false, error:'invalid_phone'|'rate_limited'|'<gateway msg>',
 *            gatewayError:'<raw gateway text>'})
 *   ?action=verifyOtp&phone=9876543210&otp=123456&callback=cb
 *     → cb({ok:true, phone:'9876543210'})
 *     → cb({ok:false, error:'invalid_code'|'expired'|'rate_limited'})
 */

var OTP_TTL_SECONDS = 300; // 5 minutes
var OTP_MAX_ATTEMPTS = 5; // wrong-code tries before invalidation
var OTP_SEND_LIMIT = 3; // max sends per number per window
var OTP_SEND_WINDOW_SECONDS = 600; // 10 minutes

function otpProps() {
  return PropertiesService.getScriptProperties();
}

function otpCache() {
  return CacheService.getScriptCache();
}

function otpNormPhone(raw) {
  var d = String(raw || '').replace(/\D/g, '');
  if (d.length === 12 && d.indexOf('91') === 0) d = d.slice(2);
  return /^[6-9]\d{9}$/.test(d) ? d : null;
}

function doGet(e) {
  var p = (e && e.parameter) || {};
  var cb = String(p.callback || 'callback');
  if (!/^[\w$]+$/.test(cb)) cb = 'callback'; // lock callback name shape
  var out;
  try {
    if (p.action === 'sendOtp') {
      out = otpSend(String(p.phone || ''));
    } else if (p.action === 'verifyOtp') {
      out = otpVerify(String(p.phone || ''), String(p.otp || ''));
    } else {
      out = { ok: false, error: 'unknown_action' };
    }
  } catch (err) {
    out = { ok: false, error: String((err && err.message) || err) };
  }
  return ContentService.createTextOutput(cb + '(' + JSON.stringify(out) + ');')
    .setMimeType(ContentService.MimeType.JAVASCRIPT);
}

function otpSend(phone) {
  phone = otpNormPhone(phone);
  if (!phone) return { ok: false, error: 'invalid_phone' };

  var sp = otpProps();
  var AUTH = sp.getProperty('MAGICTEXT_AUTH_KEY');
  var SID = sp.getProperty('MAGICTEXT_SENDER_ID');
  var ROUTE = sp.getProperty('MAGICTEXT_ROUTE');
  var TPL = sp.getProperty('MAGICTEXT_TEMPLATE_ID');
  var API = sp.getProperty('MAGICTEXT_API_URL') || 'http://panel.magictext.in/http-tokenkeyapi.php';
  if (!AUTH || !SID || !ROUTE || !TPL) {
    return { ok: false, error: 'Missing MagicText script properties on server.' };
  }

  var cache = otpCache();
  var now = Date.now();
  var sends = [];
  try {
    sends = JSON.parse(cache.get('sends_' + phone) || '[]');
  } catch (err) {
    sends = [];
  }
  sends = sends.filter(function (t) { return now - t < OTP_SEND_WINDOW_SECONDS * 1000; });
  if (sends.length >= OTP_SEND_LIMIT) return { ok: false, error: 'rate_limited' };

  var otp = String(Math.floor(100000 + Math.random() * 900000));
  var msg = 'OTP for student enrollment request is ' + otp +
    '. Please enter this to verify your details for TEONOX enrollment. Thank You TEONOX BUSINESS SOLUTIONS';
  var qs = 'authentic-key=' + encodeURIComponent(AUTH) +
    '&senderid=' + encodeURIComponent(SID) +
    '&route=' + encodeURIComponent(ROUTE) +
    '&number=' + encodeURIComponent(phone) +
    '&message=' + encodeURIComponent(msg) +
    '&templateid=' + encodeURIComponent(TPL);

  var text = '';
  var code = 0;
  try {
    var gw = UrlFetchApp.fetch(API + '?' + qs, { muteHttpExceptions: true });
    code = gw.getResponseCode();
    text = String(gw.getContentText() || '').trim();
  } catch (err) {
    return { ok: false, error: String((err && err.message) || err) };
  }
  if (code < 200 || code >= 300 || /fail|error|invalid/i.test(text)) {
    return {
      ok: false,
      error: 'MagicText gateway rejected the request (HTTP ' + code + ').',
      gatewayError: text ? text.slice(0, 300) : ('(empty gateway response body, HTTP ' + code + ')')
    };
  }

  cache.put('otp_' + phone, JSON.stringify({ otp: otp, exp: now + OTP_TTL_SECONDS * 1000, att: 0 }), OTP_TTL_SECONDS);
  sends.push(now);
  cache.put('sends_' + phone, JSON.stringify(sends), OTP_SEND_WINDOW_SECONDS);
  return { ok: true };
}

function otpVerify(phone, code) {
  phone = otpNormPhone(phone);
  if (!phone || !/^\d{6}$/.test(String(code || '').trim())) {
    return { ok: false, error: 'invalid_code' };
  }
  code = String(code).trim();
  var cache = otpCache();
  var raw = cache.get('otp_' + phone);
  if (!raw) return { ok: false, error: 'expired' };

  var rec;
  try {
    rec = JSON.parse(raw);
  } catch (err) {
    cache.remove('otp_' + phone);
    return { ok: false, error: 'expired' };
  }
  if (Date.now() > rec.exp) {
    cache.remove('otp_' + phone);
    return { ok: false, error: 'expired' };
  }
  if (rec.att >= OTP_MAX_ATTEMPTS) {
    cache.remove('otp_' + phone);
    return { ok: false, error: 'rate_limited' };
  }
  if (code !== rec.otp) {
    rec.att += 1;
    if (rec.att >= OTP_MAX_ATTEMPTS) {
      cache.remove('otp_' + phone);
    } else {
      var ttlLeft = Math.max(60, Math.ceil((rec.exp - Date.now()) / 1000));
      cache.put('otp_' + phone, JSON.stringify(rec), ttlLeft);
    }
    return { ok: false, error: 'invalid_code' };
  }
  cache.remove('otp_' + phone); // single-use
  return { ok: true, phone: phone };
}
