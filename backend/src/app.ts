// Middleware
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import logger from 'morgan';
import compression from 'compression';
import mongoose from 'mongoose';
import passport from 'passport';
import passportConfig from './utils/passportConfig';
import router from './routes/index';
import './utils/typeExtensions';

// Load .env config file contents
dotenv.config();

// Environment Variables
const NODE_ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 8000;
const origin = NODE_ENV === 'production' ? 'TODO' : 'http://localhost:3000'; // TODO: Add production URL
const mongoDB = process.env.MONGO_DB!;
const corsOptions = {
  origin: origin,
  credentials: true,
};

// Create Express Application
const app = express();

// Set up MongoDB connection
mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Imported Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());
app.use(cors(corsOptions));
app.use(compression());
app.use(passport.initialize());

// Configure Passport
passportConfig.configureLocal(passport);
passportConfig.configureJWT(passport);

// Express Router Middleware
app.use(router);

// Start Server
app.listen(PORT, () => {
  console.log(`Now listening on ${PORT}`);
});

export default app;
