const express = require('express');
const app = express();
const port = 3001

const cors = require("cors");
app.use(cors());

app.get('/reviews', (req, res) => {
    res.send({ data: 'some data coming from the backend! (change me)' });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
