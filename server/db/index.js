const mongoose = require('mongoose');
import configs from '../configs'

mongoose.connect(configs.DB_URL, { useNewUrlParser: true, user: configs.DB_USER, pass: configs.DB_PASS });
const db = mongoose.connection

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function () { console.log('connected to mLab db'); });


module.exports = db;