const express = require('express');
const router = express.Router();

const eventify_ctl = require('../controllers/eventify.controller');

router.get('/', eventify_ctl.getAllEvents);
router.post('/', eventify_ctl.createEvent);
router.get('/:playlist', eventify_ctl.findPlaylistById);
router.delete('/:id', eventify_ctl.deleteEvent);

/**TODO:
 * - search event
 * - search playlist
 * - search track
 * - create playlist?
 */

module.exports = router;