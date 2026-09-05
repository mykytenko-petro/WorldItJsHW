const express = require("express");
const moment = require("moment");

const HOST = "127.0.0.1";
const PORT = 8000;

const app = express();

app.get("/timestamp", (_, res) => {
    res.json({
        timestamp: moment().unix()
    });
});

app.listen(PORT, HOST, () => {
    console.log(`listening on http://${HOST}:${PORT}`);
});