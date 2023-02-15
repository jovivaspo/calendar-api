const express = require("express");
require("dotenv").config();
const path = require("path");

const app = express();

app.set("port", process.env.PORT);

app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.use("/api/auth", require("./routes/auth"));

module.exports = app;
