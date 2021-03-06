const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/user.models');
const Resto = require('../models/resto.models');

// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
passport.use(new GoogleStrategy({
  clientID: '646256247674-d9n3mur03uv7en2357l1gvtl24rqfiue.apps.googleusercontent.com',
  clientSecret: 'Eun13mMlsdIGGEcu1OH4rYdl',
  callbackURL: 'http://localhost:8888/auth/google/callback',
  passReqToCallback: true
},
(req, accessToken, refreshToken, profile, done) => {
  if (req.session.usertype === 'customer') {
    done(null, profile);
    User.findOneAndUpdate(
      { googleId: profile.id },
      {
        googleId: profile.id,
        firstName: profile._json.given_name,
        lastName: profile._json.family_name,
        googleImage: profile._json.picture,
      },
      { upsert: true, new: true },
      (err, user) => {
        return done(err, user);
      });
  } else {
    done(null, profile);
    Resto.findOneAndUpdate(
      { googleId: profile.id },
      {
        googleId: profile.id,
        firstName: profile._json.given_name,
        lastName: profile._json.family_name,
        googleImage: profile._json.picture,
      },
      { upsert: true, new: true },
      (err, user) => {
        return done(err, user);
      });
  }
}
));

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

module.exports = passport;
