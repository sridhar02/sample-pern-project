require("dotenv").config();

const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const { Sequelize } = require("sequelize");
const userRoutes = require("./routes/user");
const db = require("./database");

//db connection
db.authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err) => console.log("Error: " + err));

const app = express();

//middlewares
app.use(express.json());
app.use(cors());
app.use(logger("dev"));

//routes
app.use("/api/v1/user", userRoutes);

//Port number
const PORT = process.env.PORT || 5000;

//server
app.listen(PORT, () => {
  console.log(`server started at port ${PORT}`);
});
