const passport = require("passport");
require("../configs/passport-config");

const authenticate = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (error, User) => {
    if (error || !User || !User.Token) {
      return res
        .status(401)
        .json({ status: "error", code: 401, message: "Unauthorized" });
    }
    req.User = User;
    next();
  })(req, res, next);
};

module.exports = authenticate;
