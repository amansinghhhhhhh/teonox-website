function doPost(e) {

  if (!e || !e.postData) {
    return ContentService
      .createTextOutput("No POST data received")
      .setMimeType(ContentService.MimeType.TEXT);
  }

  const data = JSON.parse(e.postData.contents);
  const formName = resolveTabName_(data);
  const fields = data.fields || {};
  const files = data.files || [];          // ← uploaded files (resume etc.)
  const emailTo = "teonoxofficial@gmail.com";

  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // ── Save uploaded files to Drive, collect { fieldName: link } ──
  const fileLinks = {};
  if (files.length > 0) {
    const folder = getUploadFolder_("TEONOX Form Uploads");
    files.forEach((f) => {
      const blob = Utilities.newBlob(
        Utilities.base64Decode(f.data),
        f.mimeType || "application/octet-stream",
        f.name || "upload"
      );
      const driveFile = folder.createFile(blob);
      driveFile.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
      fileLinks[f.field] = driveFile.getUrl();
    });
  }

  // ── Get or create sheet tab ──
  let sheet = ss.getSheetByName(formName);
  if (!sheet) {
    sheet = ss.insertSheet(formName);
    sheet.appendRow(["Timestamp"]);
  }

  // ── Read existing headers ──
  const lastCol = sheet.getLastColumn();
  const headers = lastCol > 0
    ? sheet.getRange(1, 1, 1, lastCol).getValues()[0]
    : [];

  // ── Add any missing columns (text fields + file fields) ──
  const fieldKeys = Object.keys(fields);
  const fileKeys = Object.keys(fileLinks);
  const allHeaders = [...headers];
  let changed = false;

  [...fieldKeys, ...fileKeys].forEach((key) => {
    if (!allHeaders.includes(key)) {
      allHeaders.push(key);
      changed = true;
    }
  });

  if (changed) {
    sheet.getRange(1, 1, 1, allHeaders.length).setValues([allHeaders]);
  }

  // ── Build and append data row ──
  const row = allHeaders.map((h) => {
    if (h === "Timestamp") return new Date();
    if (fileLinks[h]) return fileLinks[h];          // file → Drive link
    // Force phone numbers as text to preserve leading zeros
    const val = fields[h] || "";
    if (h.toLowerCase().includes("phone") || h.toLowerCase().includes("mobile")) {
      return "'" + val;
    }
    return val;
  });

  sheet.appendRow(row);

  // ── Send email ──
  const fieldRows = fieldKeys
    .map((key) => `<tr><td style="padding:8px 12px;border-bottom:1px solid #eee;font-weight:600;color:#555;white-space:nowrap">${key}</td><td style="padding:8px 12px;border-bottom:1px solid #eee">${fields[key]}</td></tr>`)
    .join("");

  // File links as clickable rows in the email
  const fileRows = fileKeys
    .map((key) => `<tr><td style="padding:8px 12px;border-bottom:1px solid #eee;font-weight:600;color:#555;white-space:nowrap">${key}</td><td style="padding:8px 12px;border-bottom:1px solid #eee"><a href="${fileLinks[key]}" style="color:#ea580c">View / Download</a></td></tr>`)
    .join("");

  try {

    MailApp.sendEmail({
      to: emailTo,
      subject: `New Lead – ${formName}`,
      htmlBody: `
        <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto">
          <h2 style="color:#ea580c;margin-bottom:4px">New Lead Received</h2>
          <p style="color:#888;margin-top:0"><strong>Form:</strong> ${formName}</p>

          <table style="width:100%;border-collapse:collapse;margin-top:16px">
            ${fieldRows}
            ${fileRows}
          </table>

          <p style="color:#aaa;font-size:12px;margin-top:24px">
            Submitted at ${new Date().toLocaleString()}
          </p>
        </div>
      `
    });

  }
  catch (err) {

    Logger.log("EMAIL ERROR:");
    Logger.log(err);

  }

  return ContentService
    .createTextOutput(JSON.stringify({ success: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

function resolveTabName_(data) {
  const formType = String(data.form_type || "").toLowerCase();
  const rawFormName = String(data.formName || "").toLowerCase();
  const section = String(data.section_name || data.source || "").toLowerCase();
  const url = String(data.page_url || "").toLowerCase();

  if ((data.source || "") === "webinar") return "Webinar";
  if (formType.includes("brochure") || rawFormName.includes("brochure")) return "Brochure Downloads";
  if (formType.includes("newsletter") || rawFormName.includes("newsletter")) return "Newsletter Signup";
  if (formType.includes("contact") || rawFormName.includes("contact")) return "Contact Page";
  if (formType.includes("career") || rawFormName.includes("career") || section.includes("career") || url.includes("/careers")) return "Career Enquiry";
  if (rawFormName.includes("admissions") || section.includes("admissions") || url.includes("/admissions")) return "Admissions Enquiry";
  if (rawFormName.includes("campus") || section.includes("campus") || formType.includes("campus")) return "Campus Visit Booking";
  if (formType.includes("online") || rawFormName.includes("online programme") || url.includes("/programmes/build-digital-marketing-skills-with-ai")) return "Online Programme Apply";
  if (rawFormName.includes("programmes") || url.includes("/programmes")) return "Programmes Enquiry";
  if (rawFormName.includes("about") || url.includes("/about")) return "About TEONOX";
  if (rawFormName.includes("why") || url.includes("/why-teonox")) return "Why TEONOX";
  if (url.includes("/blog")) return "Blog Enquiry";
  return data.formName || data.form_type || "Unnamed Form";
}

// Get the Drive folder for uploads, create it if missing
function getUploadFolder_(name) {
  const folders = DriveApp.getFoldersByName(name);
  return folders.hasNext() ? folders.next() : DriveApp.createFolder(name);
}

function testEmail() {

  MailApp.sendEmail(
    "teonoxofficial@gmail.com",
    "Test Email From Apps Script",
    "If you received this email, MailApp is working."
  );

}
