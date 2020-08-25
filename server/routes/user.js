const express = require("express");
const { Router } = require("express");
const User = require("../models/user");
const route = express.Router();

route.get("/", (req, res) => {
  res.json({
    message: "user get route",
  });
});

route.post("/", (req, res) => {
  const { email, username, password } = req.body;
  if (!username) {
    console.log("can not be empty");
  }
  if (!email) {
    console.log("can not be empty");
  }
  if (!password) {
    console.log("can not be empty");
  }

  User.create({ email, username, password })
    .then((user) => {
      res.json({ message: "user succesfully created ", user });
    })
    .catch((err) => res.render("error", { error: err.message }));
});
route.put("/", () => {});
route.delete("/", () => {});

module.exports = route;
