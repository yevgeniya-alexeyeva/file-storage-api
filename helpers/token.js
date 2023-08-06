const jwt = require("jsonwebtoken");
require("dotenv").config();
const config = require("../configs");

const addToken = (id) => {
  const payload = {
    id,
  };

  return jwt.sign(payload, config.server.tokenSecret, {
    expiresIn: config.server.tokenLife,
  });
};

const addRefreshToken = (id) => {
  const payload = {
    id,
  };

  return jwt.sign(payload, config.server.refreshTokenSecret);
};

const verifyRefreshToken = (refreshToken) => {
  return jwt.verify(
    refreshToken,
    config.server.refreshTokenSecret,
    (err, verifiedJwt) => {
      if (err) {
        console.log(err);
        return null;
      } else {
        return verifiedJwt;
      }
    }
  );
};

const getUserID = (token) => {
  return jwt.decode(token, config.server.tokenSecret);
};

module.exports = { addToken, addRefreshToken, verifyRefreshToken, getUserID };
