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

app.get('/health', (_, res) => {
    res.json({
        status: "ok"
    });
});

app.get('/stats', (_, res) => {
    res.json({
        uptime: Math.floor(process.uptime()),
        nodeVersion: process.version,
        timestamp: moment().toISOString()
    });
});

app.listen(PORT, HOST, () => {
    console.log(`listening on http://${HOST}:${PORT}`);
});