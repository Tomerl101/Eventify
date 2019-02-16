import request from 'request';
import configs from '../configs';

export default class SpotifyApi {

  async getUserInfo(token) {
    const options = {
      url: `${configs.SPOTIFY_URL}me`,
      auth: { bearer: token },
      json: true
    };

    return new Promise(function (resolve, reject) {
      request.get(options, (error, response, body) => {
        resolve({ error, response, body });
      })
    })
  }

  async getUserPlaylists(token) {
    const options = {
      url: `${configs.SPOTIFY_URL}me/playlists`,
      auth: { bearer: token },
      json: true
    };

    return new Promise(function (resolve, reject) {
      request.get(options, (error, response, body) => {
        resolve({ error, response, body });
      })
    })
  }

  async getPlaylistById(playlist_id, token) {
    const options = {
      url: `${configs.SPOTIFY_URL}playlists/${playlist_id}?fields=tracks.items(track(artists%2Cname%2Chref%2Curi%2Calbum(name%2Chref)))`,
      auth: { bearer: token },
      json: true
    };

    return new Promise(function (resolve, reject) {
      request.get(options, (error, response, body) => {
        resolve({ error, response, body });
      })
    })
  }
}