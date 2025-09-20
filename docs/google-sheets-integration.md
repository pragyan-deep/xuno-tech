# Google Sheets Integration Setup

This guide explains how to set up Google Sheets integration for the contact form using Google Apps Script.

## Overview

The contact form sends data to a Google Apps Script Web App, which then writes the data to a Google Sheet. This provides a simple, serverless way to collect and manage contact form submissions.

## Prerequisites

- Google Account
- Access to Google Sheets
- Access to Google Apps Script

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Rename it to "Contact Form Submissions" or similar
4. Set up the following column headers in row 1:
   - A1: `Name`
   - B1: `Email`
   - C1: `Message`
   - D1: `Timestamp`
   - E1: `User Agent`
   - F1: `IP Address`
   - G1: `Status`

## Step 2: Create Google Apps Script

1. Go to [Google Apps Script](https://script.google.com)
2. Click "New project"
3. Replace the default code with the following:

```javascript
/**
 * Contact Form Handler for Google Sheets Integration
 * Receives POST requests from the contact form and stores data in Google Sheets
 */

// Configuration - UPDATE THESE VALUES
const SHEET_ID = 'YOUR_GOOGLE_SHEET_ID_HERE'; // Replace with your Google Sheet ID
const SHEET_NAME = 'Sheet1'; // Name of the sheet tab

/**
 * Handle POST requests from the contact form
 */
function doPost(e) {
  try {
    // Log the request for debugging
    console.log('Received POST request:', e.postData.contents);
    
    // Parse the JSON data
    const data = JSON.parse(e.postData.contents);
    
    // Validate required fields
    if (!data.name || !data.email || !data.message) {
      return ContentService
        .createTextOutput(JSON.stringify({
          success: false,
          error: 'Missing required fields: name, email, or message'
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Open the spreadsheet
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    
    // Prepare the row data
    const rowData = [
      data.name || '',
      data.email || '',
      data.message || '',
      data.timestamp || new Date().toISOString(),
      data.userAgent || '',
      data.ipAddress || '',
      'New' // Status column
    ];
    
    // Append the data to the sheet
    sheet.appendRow(rowData);
    
    // Log successful submission
    console.log('Successfully added contact form submission:', data.email);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Contact form submission received and stored successfully',
        timestamp: new Date().toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Log the error
    console.error('Error processing contact form:', error);
    
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: 'Failed to process contact form submission: ' + error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handle GET requests (for testing)
 */
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      success: true,
      message: 'Contact Form API is running',
      timestamp: new Date().toISOString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Test function to verify the script works
 * Run this function to test your setup
 */
function testContactSubmission() {
  const testData = {
    postData: {
      contents: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        message: 'This is a test message from the Google Apps Script test function.',
        timestamp: new Date().toISOString(),
        userAgent: 'Test Agent',
        ipAddress: '127.0.0.1'
      })
    }
  };
  
  const result = doPost(testData);
  console.log('Test result:', result.getContent());
}
```

## Step 3: Configure the Script

1. In the Apps Script editor, update the `SHEET_ID` constant:
   - Go back to your Google Sheet
   - Copy the Sheet ID from the URL (the long string between `/d/` and `/edit`)
   - Paste it as the `SHEET_ID` value in the script

2. If you named your sheet tab something other than "Sheet1", update the `SHEET_NAME` constant

## Step 4: Set Permissions

1. In the Apps Script editor, click the "Deploy" button
2. Choose "New deployment"
3. Click the gear icon next to "Type" and select "Web app"
4. Set the following options:
   - **Description**: "Contact Form Handler"
   - **Execute as**: "Me"
   - **Who has access**: "Anyone"
5. Click "Deploy"
6. You'll be prompted to authorize the script - click "Authorize access"
7. Review the permissions and click "Allow"

## Step 5: Get the Web App URL

1. After deployment, copy the "Web app URL" - it will look like:
   ```
   https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
   ```

2. This is your `APPS_SCRIPT_URL` for the environment variables

## Step 6: Configure Environment Variables

### For Development (.env.local)

Create or update your `.env.local` file:

```env
APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### For Production

Set the environment variable in your deployment platform:

```env
APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

## Step 7: Test the Integration

1. Run the test function in Apps Script:
   - In the Apps Script editor, select the `testContactSubmission` function
   - Click the "Run" button
   - Check the execution log for results
   - Verify that a test entry appears in your Google Sheet

2. Test the contact form:
   - Start your Next.js development server
   - Fill out and submit the contact form
   - Check your Google Sheet for the new submission

## Troubleshooting

### Common Issues

1. **"Google Apps Script URL not configured" error**
   - Check that `APPS_SCRIPT_URL` is set in your environment variables
   - Ensure the URL doesn't contain "YOUR_SCRIPT_ID"

2. **"403 Forbidden" or permission errors**
   - Re-deploy the Apps Script with "Anyone" access
   - Check that the script has the correct permissions

3. **Data not appearing in sheets**
   - Verify the `SHEET_ID` in the Apps Script code
   - Check the Apps Script execution logs for errors
   - Ensure the sheet tab name matches `SHEET_NAME`

4. **"Failed to process contact form submission" error**
   - Check the Apps Script logs for detailed error messages
   - Verify the JSON structure being sent matches what the script expects

### Debugging Tips

1. **Check Apps Script Logs**:
   - Go to Google Apps Script
   - Click "Executions" in the left sidebar
   - View recent execution logs

2. **Test the API directly**:
   - You can test the Apps Script URL directly in a browser
   - A GET request should return a success message

3. **Validate Environment Variables**:
   - In development, check that your `.env.local` file is being loaded
   - In production, verify environment variables are set correctly

## Security Considerations

1. **Rate Limiting**: The Next.js API includes basic rate limiting (5 requests per minute per IP)

2. **Data Sanitization**: Form data is sanitized to prevent XSS attacks

3. **Validation**: Both client-side and server-side validation is implemented

4. **Environment Variables**: Sensitive URLs are stored as environment variables, not in code

## Customization

### Adding Additional Fields

To add more form fields:

1. Update the contact form component
2. Add corresponding columns to your Google Sheet
3. Update the Google Apps Script to handle the new fields
4. Update the TypeScript interfaces in the API route

### Notification Emails

You can extend the Google Apps Script to send notification emails:

```javascript
// Add this function to your Apps Script
function sendNotificationEmail(data) {
  const subject = `New Contact Form Submission from ${data.name}`;
  const body = `
    Name: ${data.name}
    Email: ${data.email}
    Message: ${data.message}
    Timestamp: ${data.timestamp}
  `;
  
  GmailApp.sendEmail('your-email@example.com', subject, body);
}

// Call this function in doPost() after successfully adding to the sheet
```

## Production Deployment

When deploying to production:

1. Ensure all environment variables are properly set
2. Test the contact form thoroughly
3. Monitor Google Apps Script execution quotas
4. Consider implementing additional security measures for high-traffic sites

## Support

If you encounter issues with this integration:

1. Check the troubleshooting section above
2. Review Google Apps Script documentation
3. Verify that all steps were followed correctly
4. Test each component individually (form, API, Apps Script, Sheets) 