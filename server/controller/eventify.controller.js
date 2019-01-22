import request from 'request';
const User = require('../models/user.model');
import { Event } from '../models/event.model';

export const getUserEvents = (req, res, next) => {
    const { user_id = null } = req.body;

    User.findOne({ user_id }).populate('events').exec((err, events) => {
        if (err) return res.status(404).json({ error: 'data not found' })
        res.status(400).json(events)
    });
}

export const geEventById = (req, res, next) => {
    const { event_id = null } = req.body;

    Event.find({ event_id }, (err, event) => {
        if (err) return res.status(404).json({ error: 'data not found' })
        res.json(event);
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