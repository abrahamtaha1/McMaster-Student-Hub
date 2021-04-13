const express = require('express');
const { google } = require('googleapis');
const auth = new google.auth.GoogleAuth({
    keyFile: 'credentials.json',
    scopes: ['https://www.googleapis.com/auth/spreadsheets']
});
const bodyParser = require('body-parser');
const cors = require("cors");

const app = express();
const port = 3001;

const programPrerequisites = {
    "Software eng": {
        "cummulative-grade": 12,
        "courses": [{ "coursename": "Math 1ZA3", "grade": null }]
    }
}

app.use(cors());
app.use(bodyParser.json());

app.get('/reviews', async (req, res) => {

    // Create client instance for auth
    const client = await auth.getClient();

    // Instance of Google Sheets API
    const googleSheets = google.sheets({version: "v4", auth: client});

    const spreadsheetId = "1f-JWwRH9WQTsnzfokknd1jmiuPH-TR0trMLQhFhpsRA";

    // Get metadata about spreadsheet
    const metaData = await googleSheets.spreadsheets.get({
        auth,
        spreadsheetId,
    })

    // Read rows
    const getRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "Form Responses 1"
    })

    res.send(getRows.data); //ALSO TEST
    console.log(getRows.data) //testing purposes REMOVE later
});

app.post('/program-prerequisites', (req, res) => {
    res.send({ givenProgramName: `${JSON.stringify(programPrerequisites[req.body.program])} (Change this server response!)` })
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
