const jwt = require("jsonwebtoken");
require("dotenv").config();

const { SECRET_KEY } = process.env;

const addToken = (id) => {
  const payload = {
    id,
  };
  return jwt.sign(payload, SECRET_KEY);
};

module.exports = addToken;
