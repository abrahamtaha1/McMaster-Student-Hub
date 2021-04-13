const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");

const app = express();
const port = 3001;

const MBA = [
    "COMMERCE 1G40",
    "COMMERCE 1AA3",
    "COMMERCE 1BA3",
    "COMMERCE 1DA3",
    "COMMERCE 1E03",
    "COMMERCE 1MA3",
    "ECON 1BB3",
    "ECON 1BX3",
    "MATH 1A03",
    "MATH 1LS3",
    "MATH 1M03",
    "MATH 1F03",
    "COMMERCE 2GR0",
    "COMMERCE 2AB3",
    "COMMERCE 2BC3",
    "COMMERCE 2DA3",
    "COMMERCE 2FA3",
    "COMMERCE 2FB3",
    "COMMERCE 2KA3",
    "COMMERCE 20C3",
    "COMMERCE 3GR0",
    "COMMERCE 3MC3",
    "COMMERCE 3S03",
    "COMMERCE 4GR3",
    "COMMERCE 4PA3",
    "COMMERCE 4SA3"
];
const MEng = [
    "CHEM 1E03",
    "MATH 1ZA3",
    "MATH 1ZB3", 
    "MATH 1ZC3",
    "ENGINEER 1P13",
    "PHYSICS 1D03",
    "PHYSICS 1E03",
    "ENGINEER 2B03",
    "MATH 2Z03",
    "MATH 2ZZ3",
    "MECHENG 2A03",
    "MECHENG 2B03",
    "MECHENG 2C04",
    "MECHENG 2D03",
    "MECHENG 2P04",
    "MECHENG 2Q04",
    "MECHENG 2W04",
    "MECHENG 3A03",
    "MECHENG 3C03",
    "ENGINEER 2MM3",
    "MATLS 3M03",
    "MATH 3I03",
    "MECHENG 3E05",
    "MECHENG 3F04",
    "MECHENG 3M03",
    "MECHENG 3O04",
    "MECHENG 3R03",
    "MECHENG 4Q03",
    "MECHENG 4R03",
    "STATS 3Y03",
    "ENGINEER 4A03",
    "MECHENG 4M06",
    "MECHENG 4P03",
    "MECHENG 4V03"
];

app.use(cors());
app.use(bodyParser.json());

app.get('/reviews', (req, res) => {
    res.send({ data: 'some data coming from the backend! (change me)' });
});

app.post('/program-prerequisites', (req, res) => {
    if (req.body.programChoice === 'MBA') {
        res.send({ givenProgramName: MBA, gpaReq: 9 })
    } else if (req.body.programChoice === 'MEng') {
        res.send({ givenProgramName: MEng, gpaReq: 8 })
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
