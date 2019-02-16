import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import configs from './configs';
import * as auth_ctl from './controller/auth.controller';
import eventify from './routes/eventify.routes';
import db from './db';
import { parseToken } from './utils/parseToken';

const app = express();

app.use(cors())
app.options('*', cors());

app.use(express.static(__dirname + '/public'));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// auth routes
app.get('/login', auth_ctl.login);

app.get('/callback', auth_ctl.callback);

app.get('/refresh_token', auth_ctl.refreshToken);

// checking secure routes
app.use(function (req, res, next) {
  if (!req.headers.authorization) {
    return res.status(403).redirect('/');
  }
  req.body.token = parseToken(req.headers.authorization);
  next();
});

app.use('/eventify', eventify);

app.all('*', (req, res) => {
  res.redirect('/');
});

// error handling 
app.use(function (err, req, res, next) {
  const { status, name, message } = err;

  if (status == 401) {
    return res.redirect('/');
  }
  res.status(err.status);
  res.json({ status, name, message });
});

app.listen(configs.PORT, () => {
  console.log(`Server runing on port ${configs.PORT}`);
});