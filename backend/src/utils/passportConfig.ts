import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { PassportStatic } from 'passport';
import passportJWT from 'passport-jwt';
import passportLocal from 'passport-local';
import User from '../models/User';

dotenv.config();

const LocalStrategy = passportLocal.Strategy;
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const JWT_SECRET = process.env.JWT_SECRET || 'test';

/**
 * Configure Local Strategy using passport
 */
const configureLocal = (passport: PassportStatic) => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      (email, password, done) => {
        return User.findOne({ email }).then((user) => {
          if (!user) {
            return done(null, false, { message: 'Incorrect Email' });
          }

          bcrypt.compare(password, user.password, (err, success) => {
            if (err) return done(err);
            if (success) {
              return done(null, user, { message: 'Logged in Successfully' });
            } else {
              return done(null, false, { message: 'Incorrect Password' });
            }
          });
        });
      }
    )
  );
};

/**
 * Configure JWT Strategy using passport
 */
const configureJWT = (passport: PassportStatic) => {
  passport.use(
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: JWT_SECRET,
      },
      (jwtPayload, cb) => {
        return User.findById(jwtPayload.user._id)
          .then((user) => {
            return cb(null, user);
          })
          .catch((error) => {
            return cb(error);
          });
      }
    )
  );
};

export default { configureLocal, configureJWT };
