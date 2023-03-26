"use strict";
const host = "localhost";
const port = 4000;

const path = require("path");

const express = require("express");
const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => res.send({
    respond : "Hello"
}));

app.listen(port, host, () => console.log(`${host}:${port} is running....`));