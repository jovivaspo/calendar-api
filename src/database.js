const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL);

const connection = mongoose.connection;

connection.on("connected", () => {
  console.log("DB connected");
});

connection.on("error", (error) => {
  console.log("Error to connect: ", error);
});

module.exports = connection;
