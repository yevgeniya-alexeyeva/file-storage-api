const passport = require("passport");
const { ExtractJwt, Strategy } = require("passport-jwt");
const EntityFactory = require("../entityFactory");
const config = require("./index");

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.server.tokenSecret,
};

const jwtStrategy = new Strategy(options, async (payload, done) => {
  try {
    const userEntity = EntityFactory.getEntity("User");
    const User = await userEntity.findOne({
      where: { UserID: payload.id },
    });

    if (!User) throw new Error("Not found");

    done(null, User);
  } catch (error) {
    done(error);
  }
});

passport.use("jwt", jwtStrategy);
