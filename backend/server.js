const express = require('express');
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

app.get('/reviews', (req, res) => {
    res.send({ data: 'some data coming from the backend! (change me)' });
});

app.post('/program-prerequisites', (req, res) => {
    res.send({ givenProgramName: `${JSON.stringify(programPrerequisites[req.body.program])} (Change this server response!)` })
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
