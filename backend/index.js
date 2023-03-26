"use strict";
const host = "localhost";
const port = 4000;

const path = require("path");
const cors = require("cors");


const express = require("express");
const app = express();
app.use(cors());
app.use(express.json()); 


app.get("/", (req, res) => res.send({
    respond : "Hello"
}));

app.listen(port, host, () => console.log(`${host}:${port} is running....`));