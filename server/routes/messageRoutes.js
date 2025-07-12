const express = require('express');
const {getMessages} = require('../controllers/messageController');
const router = express.Router();

router.get('/getMessages',getMessages);

module.exports = router;