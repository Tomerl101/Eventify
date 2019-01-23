import request from 'request';
import configs from '../configs';
const User = require('../models/user.model');
import { Event } from '../models/event.model';

export const getUserEvents = (req, res, next) => {
    const { user_id = null } = req.body;

    User.findOne({ user_id }).populate('events').exec((err, events) => {
        if (err) return res.status(404).json({ error: 'data not found' })
        res.status(200).json(events)
    });
}

export const getEventPlaylists = (req, res, next) => {
    const { token, event_id } = req.body;

    Event.findOne({ event_id }, (err, event) => {
        if (err) return res.status(404).json({ error: 'data not found' })

        const options = {
            url: `${configs.SPOTIFY_URL}me/playlists`,
            auth: { bearer: token },
            json: true
        };

        request.get(options, (error, response, body) => {
            if (error) {
                return res.status(500).json({ error });
            }

            if (response.statusCode == 401) {
                console.log('token expired');
                return res.redirect('/');
            }

            if (body) {
                const { playlists_id: userPlaylists } = event;
                const { items: playlists } = body;

                const fillterdPlaylists = playlists.filter(pl => {
                    const playlistUri = pl.uri.split(':')[4];
                    return userPlaylists.includes(playlistUri)
                });
                return res.json(fillterdPlaylists);
            }
        });
    })



}

export const getPlaylist = (req, res, next) => {
    const { playlist_id = null } = req.body;
    console.log('​getPlaylist -> playlist_id', playlist_id)

    var options = {
        url: `https://api.spotify.com/v1/playlists/${playlist_id}`,
        auth: {
            bearer: 'BQB2LXZ1jQ0PmKjWLjoea3W12SlLPnpwUhBE-glwiOWr58XtRc0kF_h2k7s7fTuh37EwHTQYzPVlMZjsnbkr18IVEWau-anlQYIdMO_7kcsVJycwm9omdN5GzHdUMnsJY4WxLPSKkzIGcYfnp3ZGYTum2r3Ytc-0GXvjKLnQy0QQT-UQVQhYkSg3HS9EW2FtSJzJjNEjsI8GCfDbN1YoJRS9B-oDiTYHYNztDoXXSA_vGqQmba9fU2y9Y0MvTHarfqId51Z4iAXvSAjMnM9s2xwzsMct-bAZsTZ8rL8',
        }
    };

    request.get(options, (error, response, body) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: 'error' });
        }
        console.log('body:', body); // Print the HTML for the Google homepage.
    });
}