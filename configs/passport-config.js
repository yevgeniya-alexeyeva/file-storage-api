const passport = require("passport");
const { ExtractJwt, Strategy } = require("passport-jwt");
const { User } = require("../model");
require("dotenv").config();

const { SECRET_KEY } = process.env;

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET_KEY,
};

const jwtStrategy = new Strategy(options, async (payload, done) => {
  try {
    const user = await User.findById(payload.id);
    if (!user) throw new Error("Not found");
    done(null, user);
  } catch (error) {
    done(error);
  }
});

passport.use("jwt", jwtStrategy);
