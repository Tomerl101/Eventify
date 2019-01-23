const express = require('express');
const router = express.Router();

const eventify_ctl = require('../controller/eventify.controller');

router.post('/getUserEvents', eventify_ctl.getUserEvents);
router.post('/getEventPlaylists', eventify_ctl.getEventPlaylists);
router.post('/getPlaylistById', eventify_ctl.getPlaylistById);
router.post('/deleteEventById', eventify_ctl.deleteEventById);
router.post('/createEvent', eventify_ctl.createEvent);

/**TODO:
 * - create event
 * - search event
 * - search playlist
 * - search track
 * - create playlist?
 */

module.exports = router;