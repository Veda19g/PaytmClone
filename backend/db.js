const mongoose =require("mongoose");

const mongoURI = "mongodb://localhost:27017/Paytm";

mongoose.connect(mongoURI,{useNewUrlParser: true});

const db = mongoose.connection;

db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

db.once("open", () => {
  console.log("Connected to MongoDB");
});

module.exports = db;