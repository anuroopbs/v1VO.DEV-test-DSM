"use server"

import { google } from "googleapis"

// Define the type for form data
type FridaySocialFormData = {
  name: string
  email: string
  dateTime: string
  skillLevel: string
  comments: string
}

// Define the type for the response
type SubmissionResponse = {
  success: boolean
  message?: string
}

export async function submitFridaySocialForm(data: FridaySocialFormData): Promise<SubmissionResponse> {
  try {
    // Validate the input data
    if (!data.name || !data.email || !data.dateTime || !data.skillLevel) {
      return {
        success: false,
        message: "Please fill in all required fields",
      }
    }

    // Initialize Google Sheets API
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    })

    const sheets = google.sheets({ version: "v4", auth })

    // Spreadsheet ID from the URL
    const spreadsheetId = "1Ent2eQtxhEk0o6bAsrPtKIXN7IQVQl8ymqdV7jupnFs"

    // Get the current date and time for the timestamp
    const timestamp = new Date().toISOString()

    // Prepare the row data (newest entries first)
    const values = [
      [timestamp, data.name, data.email, data.dateTime, data.skillLevel, data.comments || "No additional comments"],
    ]

    // Insert the data at the top of the sheet (after the header row)
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: "Sheet1!A2:F2", // Start at row 2 (after header)
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS", // Insert new rows
      requestBody: {
        values,
      },
    })

    return {
      success: true,
    }
  } catch (error) {
    console.error("Error submitting form to Google Sheets:", error)
    return {
      success: false,
      message: "There was an issue connecting to our system. Please try again later or contact us via Instagram DMs.",
    }
  }
}
