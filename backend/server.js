const express = require('express');
const {google} = require('googleapis');
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

    const auth = new google.auth.GoogleAuth({
        keyFile: 'credentials.json',
        scopes: ['https://www.googleapis.com/auth/spreadsheets']
    });

    // Create client instance for auth
    const client = await auth.getClient();

    // Instance of Google Sheets API
    const googleSheets = google.sheets({version: "v4", auth: client});

    const spreadsheetID = "1f-JWwRH9WQTsnzfokknd1jmiuPH-TR0trMLQhFhpsRA";

    // Get metadata about spreadsheet
    const metaData = await googleSheets.spreadsheets.get({
        auth,
        spreadsheetID,
    })



    res.send(metaData);
});

app.post('/program-prerequisites', (req, res) => {
    res.send({ givenProgramName: `${JSON.stringify(programPrerequisites[req.body.program])} (Change this server response!)` })
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
