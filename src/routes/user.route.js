const express = require('express');
const user = require('../controller/user/user.controller')
const router = express.Router();

// APIs
router.post('/signin',user.createUser);
router.post('/login',user.login);

module.exports = router;