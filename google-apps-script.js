/**
 * Google Apps Script for NTS Distillers Contact Form
 * 
 * Instructions:
 * 1. Open Google Sheets (https://sheets.google.com).
 * 2. Create a new spreadsheet and name it (e.g., "NTS Website Inquiries").
 * 3. In the menu, go to Extensions -> Apps Script.
 * 4. Replace the contents of the `Code.gs` file with this script.
 * 5. Click the Save icon (floppy disk).
 * 6. Click "Deploy" -> "New deployment" in the top right.
 * 7. Click the gear icon next to "Select type" and select "Web app".
 * 8. Set the configuration options:
 *    - Description: NTS Contact Form Web App
 *    - Execute as: Me (your-email@gmail.com)
 *    - Who has access: Anyone (This is important to allow public submissions!)
 * 9. Click "Deploy".
 * 10. Authorize the permissions when prompted.
 * 11. Copy the "Web app URL" provided in the final popup.
 * 12. Paste that URL into `App.jsx` at the top where `GOOGLE_APPS_SCRIPT_URL` is defined:
 *     const GOOGLE_APPS_SCRIPT_URL = "YOUR_COPIED_WEB_APP_URL";
 */

function doPost(e) {
  // Gracefully handle manual runs in the Google Apps Script editor
  if (!e) {
    Logger.log("Manual execution successful! To receive real submissions, submit the form from the website.");
    return ContentService.createTextOutput("Manual run completed successfully.");
  }

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  var name = "";
  var email = "";
  var message = "";
  
  try {
    // Attempt to parse JSON request body
    if (e.postData && e.postData.contents) {
      var data = JSON.parse(e.postData.contents);
      name = data.name || "";
      email = data.email || "";
      message = data.message || "";
    }
  } catch (err) {
    // If not JSON, parse from POST parameters
  }
  
  if (!name && !email && !message && e.parameter) {
    name = e.parameter.name || "";
    email = e.parameter.email || "";
    message = e.parameter.message || "";
  }
  
  // Append row: [Timestamp, Name, Email, Message]
  sheet.appendRow([new Date(), name, email, message]);
  
  // Return success response (Google Web Apps handle CORS automatically)
  return ContentService.createTextOutput(JSON.stringify({ status: 'success' }))
    .setMimeType(ContentService.MimeType.JSON);
}
