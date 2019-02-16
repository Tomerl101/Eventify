const mongoose = require('mongoose');
const Schema = mongoose.Schema;

export const eventSchema = new Schema({
    event_id: { type: Number, required: true },
    user_id: { type: String, required: true },
    event_name: { type: String, required: true },
    event_img: { type: String, required: true },
    description: { type: String, required: true },
    playlists_id: [String]
});

export const Event = mongoose.model('Event', eventSchema);