import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import dotenv from 'dotenv';
import path from 'path';
import SessionRoutes from './Session/routes';
import { ValidationError } from 'express-validation';

dotenv.config({ path: path.join(__dirname, './.env') });
const PORT = process.env.PORT || 4000;

// Middleware
const app = express();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

app.use(
  session({
    secret: process.env.SESSION_KEY || '',
    resave: true,
    saveUninitialized: true,
  })
);

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/v1', SessionRoutes);

app.use(
  (err: ValidationError, _req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ValidationError) {
      return res.status(err.statusCode).json(err);
    }

    return res.status(500).json(err);
  }
);

app.listen(PORT, () => {
  console.log('Server is on', PORT);
});
