const express = require("express");
const Router = require("express");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const route = express.Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;

route.get("/", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        authData,
      });
    }
  });
});

route.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    bcrypt.compare(password, user.password, (err, result) => {
      result
        ? jwt.sign(
            { user },
            "secretkey",
            { expiresIn: "3000s" },
            (err, token) => {
              res.json({ message: "user succesfully created ", token });
            }
          )
        : res
            .status(404)
            .json({ message: "user not found with the entered password" });
    });
  } catch (err) {
    res.json({ error: err });
  }
});

route.post("/register", (req, res) => {
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
  bcrypt.hash(password, saltRounds, function (err, hash) {
    console.log(hash, password);
    User.create({ email, username, password: hash })
      .then((user) => {
        res.json({ message: "user succesfully created ", user });
      })
      .catch((err) => res.status(404).json({ error: err }));
  });
});

route.post("/api/posts", verifyToken, (req, res) => {
  jwt.verify(req.token, process.env.JWT_KEY, (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        authData,
      });
    }
  });
});

function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers["authorization"];
  // Check if bearer is undefined
  if (typeof bearerHeader !== "undefined") {
    // Split at the space
    const bearer = bearerHeader.split(" ");
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
    // Next middleware
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }
}

module.exports = route;

//   User.create({ email, username, password })
//     .then((user) => {
//       jwt.sign({ user }, "secretkey", { expiresIn: "30s" }, (err, token) => {
//         res.json({ message: "user succesfully created ", token });
//       });
//     })
//     .catch((err) => res.render("error", { error: err.message }));
