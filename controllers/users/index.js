const addUser = require("./signup");
const signin = require("./signin");
const refreshToken = require("./refreshToken");
const getInfo = require("./getInfo");
const logout = require("./logout");

module.exports = {
  addUser,
  signin,
  refreshToken,
  getInfo,
  logout,
};
