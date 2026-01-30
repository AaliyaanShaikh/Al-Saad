/**
 * Callback Form → Google Sheets
 *
 * SETUP:
 * 1. Open the Google Sheet where you want form data (this file and script must be for THIS sheet).
 * 2. Extensions → Apps Script → replace ALL code with this script → Save (Ctrl+S).
 * 3. Deploy → Manage deployments → pencil (Edit) → Version: New version → Deploy.
 *    (Or Deploy → New deployment → Web app → Execute as: Me, Who has access: Anyone.)
 * 4. Copy the Web app URL into .env as VITE_GOOGLE_SCRIPT_URL.
 *
 * DATA: All submissions go to a tab named "Callback Form" (created automatically).
 * If you don't see it, check the sheet tabs at the bottom for "Callback Form".
 */

const SHEET_NAME = 'Callback Form';
const HEADERS = ['Timestamp', 'Name', 'Email', 'Phone', 'Preferred Time', 'Message'];

function doPost(e) {
  try {
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = spreadsheet.getSheetByName(SHEET_NAME);

    if (!sheet) {
      sheet = spreadsheet.insertSheet(SHEET_NAME);
      sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
      sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    }

    if (sheet.getLastRow() === 0) {
      sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
      sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    }

    var body = (e && e.postData && e.postData.contents) ? e.postData.contents : null;
    if (!body) {
      return jsonResponse(400, { error: 'No data received' });
    }

    var data = JSON.parse(body);
    var timestamp = new Date();
    var name = (data.name != null) ? String(data.name) : '';
    var email = (data.email != null) ? String(data.email) : '';
    var phone = (data.phone != null) ? String(data.phone) : '';
    var preferredTime = (data.preferredTime != null) ? String(data.preferredTime) : '';
    var message = (data.message != null) ? String(data.message) : '';

    sheet.appendRow([timestamp, name, email, phone, preferredTime, message]);
    SpreadsheetApp.flush();

    return jsonResponse(200, { success: true, message: 'Saved to sheet' });
  } catch (err) {
    return jsonResponse(500, { error: err.toString() });
  }
}

/** Run this once from Apps Script (Run → runTestWrite) to confirm the script can write to this sheet. */
function runTestWrite() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
  }
  sheet.appendRow([new Date(), 'Test Name', 'test@test.com', '9999999999', 'flexible', 'Test from script']);
  SpreadsheetApp.flush();
  Logger.log('Test row written to sheet: ' + sheet.getName());
}

function doGet(e) {
  return jsonResponse(200, { ok: true, message: 'Callback form endpoint is working' });
}

function jsonResponse(code, body) {
  var output = ContentService.createTextOutput(JSON.stringify(body));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}
