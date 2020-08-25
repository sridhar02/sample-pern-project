const Sequelize = require("sequelize");
const db = require("../database");

const User = db.define("users", {
  email: {
    type: Sequelize.STRING,
  },
  username: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
});

User.sync().then(() => {
  console.log("table created");
});

module.exports = User;
