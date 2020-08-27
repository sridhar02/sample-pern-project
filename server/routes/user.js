const express = require("express");
const Router = require("express");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const route = express.Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const axios = require("axios");
const queryString = require("query-string");

// user registration end point
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

// user login end point
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

//Get User details end point
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

//LinkedIn oAuth end point to serve Data to the client
route.get("/linkedInOauth/:code", verifyToken, (req, res) => {
  const { code } = req.params;
  jwt.verify(req.token, process.env.JWT_KEY, (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      getLinkedInAuthorizationCode(code)
        .then((response) => {
          if (response.status === 200) {
            getUserData(response.data.access_token)
              .then((response) => res.json(response.data))
              .catch((err) => res.sendStatus(404));
          }
        })
        .catch((err) => console.log(err));
    }
  });
});

//Helper functions for the Api's
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

function getLinkedInAuthorizationCode(codeLinkedIN) {
  const params = {
    grant_type: "authorization_code",
    code: codeLinkedIN,
    redirect_uri: "http://localhost:3000/profile",
    client_id: process.env.EXPRESS_APP_CLIENT_ID,
    client_secret: process.env.EXPRESS_APP_CLIENT_SECRET,
  };
  const query = queryString.stringify(params);
  return axios.get(`https://www.linkedin.com/oauth/v2/accessToken?${query}`);
}

function getUserData(accessToken) {
  return axios.get(`https://api.linkedin.com/v2/me`, {
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  });
}

module.exports = route;
