const config = require("config");
const passport = require("passport");
const JWTstrategy = require('passport-jwt').Strategy;

const secret = process.env.TOKEN_KEY || config.get("TOKEN_KEY");

const cookieExtractor = req => {
  let jwt = null;
  if(req && req.cookies) {
    jwt = req.cookies['jwt'];
  }
  return jwt;
};

passport.use('jwt',
  new JWTstrategy(
    {
      secretOrKey: secret,
      jwtFromRequest: cookieExtractor,
      passReqToCallback: true
    },
    async (req, token, done) => {
      const {expiration, user} = token;
      if(Date.now() > expiration) {
        done('Unauthorized', false);
      }
      done(null, token);
    }
  )
);

module.exports = passport;