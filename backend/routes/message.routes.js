const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const { 
    sendMessage, 
    getMessages 
} = require('../controllers/message.controller');


router.post('/', auth, sendMessage);
router.get('/:rentalId', auth, getMessages);

module.exports = router;