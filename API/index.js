const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");
//** Configuring the database */
const dbConfig = require("./config/database.config.js");
const mongoose = require("mongoose");

//** Create express app */
const app = express();

//** CORS */
app.use(cors());

//** Parse application */
app.use(bodyParser.urlencoded({ extended: true }));

//** Parse application/json */
app.use(bodyParser.json());

mongoose.Promise = global.Promise;

//** Connecting to the database */
mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

//** Define a simple route */
app.get("/", (req, res) => {
  res.json({ message: "Welcome to To-Do List Application." });
});

require("./app/routes/todo.route.js")(app);

//** Listen for requests */
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
