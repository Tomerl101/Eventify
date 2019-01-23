const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    user_id: { type: String, required: true },
    events: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Event' }]
});

const User = mongoose.model('User', userSchema);

module.exports = User
