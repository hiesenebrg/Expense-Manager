const passport = require("passport");
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
require("dotenv").config();

const User = require("../models/user");

let opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),

  secretOrKey: "expense",
};

passport.use(
  new JWTStrategy(opts, async function (jwtPayLoad, done) {
    try {
      let user = await User.findById(jwtPayLoad._id);
      
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (error) {
      console.log(`there is an error in jwt ${error}`);
    }
  })
);

module.exports = passport;
