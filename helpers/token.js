const jwt = require("jsonwebtoken");
require("dotenv").config();
const config = require("../configs");

const createToken = (id) => {
  const payload = {
    id,
  };

  return jwt.sign(payload, config.server.tokenSecret, {
    expiresIn: config.server.tokenLife,
  });
};

const createRefreshToken = (id) => {
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

const getDecodedToken = (token) => {
  return jwt.decode(token, config.server.tokenSecret);
};

module.exports = {
  createToken,
  createRefreshToken,
  verifyRefreshToken,
  getDecodedToken,
};
