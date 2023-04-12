import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import tweetRouter from './router/tweet.js';
import authRouter from './router/auth.js';
import { config } from './config.js';
import { connectDB } from './database/database.js';

const app = express();

const corsOption = {
  origin: config.cors.allowedOrigin,
  optionSuccessStatus: 200,
  credentials: true, // allow the Access-Control-Allow-Credentials
};

app.use(express.json());
app.use(helmet());
app.use(cors(corsOption));
app.use(morgan('tiny'));

app.use('/tweets', tweetRouter);
app.use('/auth', authRouter);

app.use((req, res, next) => {
  res.sendStatus(404);
});

app.use((error, req, res, next) => {
  console.log(error);
  res.sendStatus(500);
});

connectDB()
  .then(() => {
    app.listen(config.host.port);
    console.log('server started');
  })
  .catch(console.error);
