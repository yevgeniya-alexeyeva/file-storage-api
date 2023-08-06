const passport = require("passport");
require("../configs/passport-config");

const authenticate = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (error, user) => {
    if (error || !user || !user.token) {
      return res
        .status(401)
        .json({ status: "error", code: 401, message: "Unauthorized" });
    }
    req.user = user;
    next();
  })(req, res, next);
};

module.exports = authenticate;
