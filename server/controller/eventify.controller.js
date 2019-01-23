import request from 'request';
import configs from '../configs';
import ApiError from '../utils/errors';
const User = require('../models/user.model');
import { Event } from '../models/event.model';
import _SpotifyApi from '../api/spotify';

const SpotifyApi = new _SpotifyApi();

export const getUserEvents = (req, res, next) => {
    const { user_id = null } = req.body;

    User.findOne({ user_id }).populate('events').exec((err, events) => {
        console.log('events-> ', events);
        if (err) return next(ApiError.ServerError);
        if (!events) return next(ApiError.NotFoundError);
        res.status(200).json(events)
    });
}

export const getEventPlaylists = async (req, res, next) => {
    const { token, event_id } = req.body;

    await Event.findById(event_id, async (err, event) => {
        if (err) return next(ApiError.ServerError);
        if (!event) return next(ApiError.NotFoundError);

        const result = await SpotifyApi.getUserPlaylists(token);

        if (result.error) {
            return next(ApiError.ServerError);
        }

        if (result.response.statusCode == 401) {
            return res.redirect('/');
        }

        if (result.body) {
            const { playlists_id: userPlaylists } = event;
            const { items: playlists } = result.body;

            const fillterdPlaylists = playlists.filter(pl => {
                const playlistUri = pl.uri.split(':')[4];
                return userPlaylists.includes(playlistUri)
            });
            return res.json(fillterdPlaylists);
        }
    })
}

export const getPlaylistById = async (req, res, next) => {
    const { token, playlist_id = null } = req.body;

    const result = await SpotifyApi.getPlaylistById(playlist_id, token);

    if (result.error) {
        return next(ApiError.ServerError);
    }

    if (result.response.statusCode == 401) {
        return res.redirect('/');
    }

    if (result.body) {
        return res.json(result.body);
    }
}