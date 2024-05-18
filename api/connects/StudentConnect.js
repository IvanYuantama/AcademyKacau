const mongoose = require("mongoose");

connectMongo = async function () {
  mongoose.connect(process.env.URL);
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error: "));
  db.once("open", function () {
    console.log("Connected to MongoDB AcademyCrypto by Timothy Ivan");
  });
};

module.exports = {
  connectMongo,
};
