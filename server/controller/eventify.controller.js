import ApiError from '../utils/errors';
const User = require('../models/user.model');
import { Event } from '../models/event.model';
import _SpotifyApi from '../api/spotify';

const SpotifyApi = new _SpotifyApi();

export const getUserInfo = async (req, res, next) => {
    const { token } = req.body;

    const { error, response, body } = await SpotifyApi.getUserInfo(token);
    if (error) return next(ApiError.ServerError);
    if (response.statusCode == 401) return next(ApiError.NotAuthoraize);
    res.status(200).json(body);
}

export const getUserEvents = (req, res, next) => {
    const { user_id = null } = req.body;

    User.findOne({ user_id }).populate('events').exec((err, events) => {
        if (err) return next(new ApiError(err.message).ServerError);
        if (!events) return next(ApiError.NotFoundError);
        res.status(200).json(events)
    });
}


export const getEventPlaylists = async (req, res, next) => {
    const { token, event_id } = req.body;

    await Event.findById(event_id, async (err, event) => {
        if (err) return next(new ApiError(err.message).ServerError);
        if (!event) return next(ApiError.NotFoundError);

        const { error, response, body } = await SpotifyApi.getUserPlaylists(token);

        if (error) return next(ApiError.ServerError);
        if (response.statusCode == 401) return next(ApiError.NotAuthoraize);

        const { playlists_id: userPlaylists } = event;
        const { items: playlists } = body;
        const fillterdPlaylists = playlists.filter(pl => {
            const playlistUri = pl.uri.split(':')[4];
            return userPlaylists.includes(playlistUri)
        });
        return res.json(fillterdPlaylists);
    })
}


export const getPlaylistById = async (req, res, next) => {
    const { token, playlist_id = null } = req.body;
    const { error, response, body } = await SpotifyApi.getPlaylistById(playlist_id, token);

    if (error) return next(new ApiError(err.message).ServerError);
    if (response.statusCode == 401) return next(ApiError.NotAuthoraize);

    return res.json(body);
}

export const deleteEventById = (req, res, next) => {
    const { event_id, user_id } = req.body;

    Event.findByIdAndDelete(event_id, (err, event) => {
        if (err) return next(new ApiError(err.message).ServerError);
        if (!event) return next(ApiError.NotFoundError);
    });

    User.findOne({ user_id }, (err, user) => {
        if (err) return next(new ApiError(err.message).ServerError);
        if (!user) return next(ApiError.NotFoundError);
        const { events } = user;
        const fillterdEvents = events.filter(e => e != event_id);

        User.findOneAndUpdate({ user_id }, { events: fillterdEvents }, (err, user) => {
            if (err) return next(new ApiError(err.message).ServerError);
            if (!user) return next(ApiError.NotFoundError);
            return res.json(fillterdEvents)
        })
    });
}



export const createEvent = (req, res, next) => {
    try {
        const event = new Event(req.body);
        event.save((err, event) => {
            console.log(err.message);
            if (err) return next(new ApiError(err.message).ServerError);
            return res.json(event);
        });
    } catch (e) {
        console.log(e);
    }
}