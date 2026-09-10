/**
 * Google Apps Script — Webinar Form Handler
 *
 * Deploy this as a Web App (Execute as: Me, Who has access: Anyone).
 * Endpoint URL will be like:
 *   https://script.google.com/macros/s/AKfyc.../exec
 *
 * Routes submissions to a "Webinar" tab when source === "webinar".
 * All other submissions go to the existing "Leads" tab (unchanged).
 *
 * Expected POST body (JSON):
 * {
 *   fullName, email, whatsapp, location,
 *   qualification, profile, reason,
 *   source,           // hardcoded "webinar"
 *   traffic_channel,  // user's dropdown selection (Instagram, LinkedIn, etc.)
 *   referral,         // optional
 *   submittedAt       // ISO timestamp
 * }
 */

var SPREADSHEET_ID = 'YOUR_GOOGLE_SHEET_ID_HERE'; // <-- Replace with your sheet ID

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    // Determine which tab to write to
    var sheetName = data.source === 'webinar' ? 'Webinar' : 'Leads';

    var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    var sheet = ss.getSheetByName(sheetName);

    // Auto-create the Webinar tab if it doesn't exist yet
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
      sheet.appendRow([
        'Timestamp',
        'Full Name',
        'Email',
        'WhatsApp',
        'Location',
        'Qualification',
        'Profile',
        'Reason',
        'Traffic Channel',
        'Source',
        'Referral',
        'Submitted At'
      ]);
      // Style the header row
      var headerRange = sheet.getRange(1, 1, 1, 12);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#FF6A2B');
      headerRange.setFontColor('#FFFFFF');
    }

    // Append the submission row
    sheet.appendRow([
      new Date().toISOString(),   // Timestamp
      data.fullName   || '',
      data.email      || '',
      data.whatsapp   || '',
      data.location   || '',
      data.qualification || '',
      data.profile    || '',
      data.reason     || '',
      data.traffic_channel || '', // User's selected dropdown value
      data.source     || 'webinar',
      data.referral   || '',
      data.submittedAt || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Optional: Test function — run from Apps Script editor to verify setup.
 */
function testDoPost() {
  var testData = {
    postData: {
      contents: JSON.stringify({
        fullName: 'Test User',
        email: 'test@example.com',
        whatsapp: '+91 99999 00000',
        location: 'Pune',
        qualification: 'Graduate',
        profile: 'Student',
        reason: 'Learn new skills',
        source: 'webinar',
        traffic_channel: 'Instagram',
        referral: '',
        submittedAt: new Date().toISOString()
      })
    }
  };

  var result = doPost(testData);
  Logger.log(result.getContent());
}
