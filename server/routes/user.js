const express = require("express");
const Router = require("express");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const route = express.Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const axios = require("axios");
const queryString = require("query-string");
const util = require("util");

const verifyAsync = util.promisify(jwt.verify);

// user registration end point
route.post("/register", (req, res) => {
  const { email, username, password } = req.body;
  if (!username) {
    //change required
    console.log("can not be empty");
  }
  if (!email) {
    //change required
    console.log("can not be empty");
  }
  if (!password) {
    //change required
    console.log("can not be empty");
  }

  bcrypt.hash(password, saltRounds, function (err, hash) {
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
  res.json(req.authData.user);
});

//LinkedIn oAuth end point to serve Data to the client
route.get("/linkedInOauth/:code", verifyToken, async (req, res) => {
  const { code } = req.params;
  try {
    const response = await getLinkedInAuthorizationCode(code);
    if (response.status === 200) {
      const response = getLinkedInUserData(response.data.access_token);
      if (response.status === 200) {
        res.json(response.data);
        return;
      }
    }
    throw new Error();
  } catch (error) {
    res.sendStatus(403);
  }
});

//Helper functions for the Api's
async function verifyToken(req, res, next) {
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
    try {
      const authData = await verifyAsync(req.token, process.env.JWT_KEY);
      req.authData = authData;
      // Next middleware
      next();
    } catch (error) {
      res.sendStatus(401);
    }
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

function getLinkedInUserData(accessToken) {
  return axios.get(`https://api.linkedin.com/v2/me`, {
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  });
}

module.exports = route;
