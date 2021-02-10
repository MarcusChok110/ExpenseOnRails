import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { PassportStatic } from 'passport';
import passportJWT from 'passport-jwt';
import passportLocal from 'passport-local';
import User from './models/User';

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
      async (email, password, done) => {
        try {
          const user = await User.findOne({ email: email }).exec();
          if (!user) {
            return done(null, false, { message: 'Incorrect Email!' });
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (!passwordsMatch) {
            return done(null, false, { message: 'Incorrect Password' });
          } else {
            return done(null, user, { message: 'Logged in Successfully' });
          }
        } catch (error) {
          done(error);
        }
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
      async (jwtPayload, cb) => {
        try {
          const user = await User.findById(jwtPayload.user._id).exec();
          return cb(null, user);
        } catch (err) {
          return cb(err);
        }
      }
    )
  );
};

export default { configureLocal, configureJWT };
