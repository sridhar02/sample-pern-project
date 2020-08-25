const Sequelize = require("sequelize");
const db = require("../database");

const User = db.define("users", {
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
  },
});

User.sync().then(() => {
  console.log("table created");
});

module.exports = User;
