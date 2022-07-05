const express = require('express');
const user = require('../controller/user/user.controller');
const { auth } = require('../middleware/authentication')
const router = express.Router();

// APIs
router.post('/signin',user.createUser);
router.post('/login',user.login);

router.get('/user',user.getAllUser);
router.get('/user/profile', user.getOneUser);
router.post('/user', user.createUser);
router.put('/user/:id', user.updateUser);
router.delete('/user/:id', user.removeUser);

module.exports = router;