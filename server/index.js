import "@babel/polyfill";
import configs from './configs'
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
// const sport = require('./routes/sport');
// const db = require('./db');
import * as auth_ctl from './controller/auth.controller';

const app = express();

app.use(express.static(__dirname + '/public'));
app.use(cors())
app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.use('/eventify', eventify);

//error handling middelware
// app.use(function (err, req, res, next) {
//   const { status, name, message } = err;
//   res.status(err.status);
//   res.json({ status, name, message });
// });
app.get('/login', auth_ctl.login);

app.get('/callback', auth_ctl.callback);

app.get('/refresh_token', auth_ctl.refreshToken);

app.all('*', (req, res) => {
  res.redirect('/');
});

app.listen(configs.PORT, () => {
  console.log(`Server runing on port ${configs.PORT}`);
});