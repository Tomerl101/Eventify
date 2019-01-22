const express = require('express');
const router = express.Router();

const eventify_ctl = require('../controller/eventify.controller');

router.post('/getUserEvents', eventify_ctl.getUserEvents);
router.post('/getEventPlaylists', eventify_ctl.getEventPlaylists);
router.post('/getPlaylist', eventify_ctl.getPlaylist);


// router.post('/', eventify_ctl.createEvent);
// router.get('/:playlist', eventify_ctl.findPlaylistById);
// router.delete('/:id', eventify_ctl.deleteEvent);

/**TODO:
 * - search event
 * - search playlist
 * - search track
 * - create playlist?
 */

module.exports = router;