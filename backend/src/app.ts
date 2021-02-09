// Middleware
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import logger from 'morgan';
import compression from 'compression';

// Routes
import indexRouter from './routes/indexRouter';
import usersRouter from './routes/usersRouter';

// Load .env config file contents
dotenv.config();

// Environment Variables
const NODE_ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 8000;
const origin = NODE_ENV === 'production' ? 'TODO' : 'http://localhost:3000'; // TODO: Add production URL
const corsOptions = {
  origin: origin,
  credentials: true,
};

// Create Express Application
const app = express();

// Imported Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());
app.use(cors(corsOptions));
app.use(compression());

// Express Router Middleware
app.use('/', indexRouter);
app.use('/users', usersRouter);

// Start Server
app.listen(PORT, () => {
  console.log(`Now listening on ${PORT}`);
});

export default app;
