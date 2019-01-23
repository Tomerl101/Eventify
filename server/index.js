
// require("@babel/register");
// require("@babel/polyfill");
import configs from './configs';
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const eventify = require('./routes/eventify.routes');
const db = require('./db');
import * as auth_ctl from './controller/auth.controller';
import { parseToken } from './utils/parseToken';

const app = express();

app.use(express.static(__dirname + '/public'));
app.use(cors())
app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// auth routes
app.get('/login', auth_ctl.login);

app.get('/callback', auth_ctl.callback);

app.get('/refresh_token', auth_ctl.refreshToken);

// middelware for checking secure routes 
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

// error handling middelware
// catch error 401 (token expired)
app.use(function (err, req, res, next) {
  const { status, name, message } = err;
  res.status(err.status);
  res.json({ status, name, message });
});

app.listen(configs.PORT, () => {
  console.log(`Server runing on port ${configs.PORT}`);
});