const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const router = require("./routes/index.js");

const db = require("./models"); // Import Sequelize models

// Config Envioronment Variable
dotenv.config({ path: path.resolve("./", `.env.${process.env.NODE_ENV}`) });

const app = express();
const port = process.env.PORT || 6600;

// Restrict CORS
app.use(cors({ credentials: true, origin: "*" }));

// Serve Static Content
app.use("/", express.static(path.resolve(__dirname, "../public")));

// Setup Expres Parser and routes
app.use(express.json());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use("/api/", router);

// Handling Errors
app.use((err, req, res, next) => {
  // console.log(err);
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";
  res.status(err.statusCode).json({
    error: err.message,
  });
});

// Synchronize Sequelize Models with Database
db.sequelize
  .sync({ alter: false }) // Update this to `force: true` if you want to drop and recreate the table every time
  .then(() => {
    console.log("Database synced and tables created.");
  })
  .catch((error) => {
    // console.error("Error syncing database:", error);
  });

// setup express server port
app.listen(port, () =>
  console.log("Server running at port ", port, process.env.NODE_ENV)
);
