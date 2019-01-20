import request from 'request';
import querystring from 'querystring';
import configs from '../configs';
import { generateRandomString } from '../utils/generateRandomString';


export function login(req, res) {

  const state = generateRandomString(16);
  res.cookie(configs.STATE_KEY, state);

  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: configs.CLIENT_ID,
      scope: configs.SCOPE,
      redirect_uri: configs.REDIRECT_URI,
      state: state
    }));
};


export function callback(req, res) {

  // application requests refresh and access tokens
  // after checking the state parameter
  const code = req.query.code || null;
  const state = req.query.state || null;
  const storedState = req.cookies ? req.cookies[configs.STATE_KEY] : null;

  if (state === null || state !== storedState) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    res.clearCookie(configs.STATE_KEY);
    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: configs.REDIRECT_URI,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(configs.CLIENT_ID + ':' + configs.CLIENT_SECRET).toString('base64'))
      },
      json: true
    };

    request.post(authOptions, function (error, response, body) {
      if (!error && response.statusCode === 200) {

        const access_token = body.access_token,
          refresh_token = body.refresh_token;


        const options = {
          url: 'https://api.spotify.com/v1/me',
          // url: 'http://localhost:5500/index1.js',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };

        // use the access token to access the Spotify Web API
        request.get(options, function (error, response, body) {
          console.log(body);
        });

        // we can also pass the token to the browser to make requests from there
        res.redirect('/#' +
          querystring.stringify({
            access_token: access_token,
            refresh_token: refresh_token
          }));
      } else {
        res.redirect('/#' +
          querystring.stringify({
            error: 'invalid_token'
          }));
      }
    });
  }
};


export function refreshToken(req, res) {

  // requesting access token from refresh token
  const refresh_token = req.query.refresh_token;
  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (new Buffer(configs.CLIENT_ID + ':' + configs.CLIENT_SECRET).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      const access_token = body.access_token;
      res.send({
        'access_token': access_token
      });
    }
  });
};