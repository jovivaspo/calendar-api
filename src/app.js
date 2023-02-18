const express = require("express");
require("dotenv").config();
const path = require("path");
require("./database");
const cors = require("cors");

const app = express();

app.set("port", process.env.PORT);

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/events"));

module.exports = app;
