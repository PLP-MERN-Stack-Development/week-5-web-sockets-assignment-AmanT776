const express = require('express');
const router = express.Router();
const {createRoom,getRooms} = require('../controllers/roomsController')

router.post('/createRoom',createRoom);
router.get('/getRooms',getRooms);

module.exports = router;