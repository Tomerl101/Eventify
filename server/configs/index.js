require('dotenv').config();
const configs = {};

configs.CLIENT_ID = process.env.CLIENT_ID;
configs.CLIENT_SECRET = process.env.CLIENT_SECRET;
configs.REDIRECT_URI = process.env.REDIRECT_URI;
configs.STATE_KEY = process.env.STATE_KEY;
configs.SCOPE = ['streaming',
  'user-read-birthdate',
  'user-read-private',
  'user-modify-playback-state',
  'user-library-read',
  'playlist-modify-private',
  'playlist-modify-public',
  'playlist-read-private']

configs.DB_URL = process.env.DB_URL;
configs.DB_USER = process.env.DB_USER;
configs.DB_PASS = process.env.DB_PASS;

configs.PORT = process.env.PORT || 8080;

export default configs;