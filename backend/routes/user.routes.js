const express = require('express');
const router = express.Router();

// importing controllers
const userauth = require('../controllers/user.controller');
const auth = require('../middleware/auth');
const { route } = require('./rental.routes');




router.post('/signup', userauth.signup);
router.post('/login', userauth.login);
router.get('/logout', userauth.logout);
router.get('/me', auth, userauth.getUser);

module.exports = router;