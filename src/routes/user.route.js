const express = require('express');
const user = require('../controller/user/user.controller');
const { authentication } = require('../middleware/authentication')
const router = express.Router();

// APIs
router.post('/signin',user.createUser);
router.post('/login',user.login);

router.get('/user', authentication, user.getAllUser);
router.get('/user/profile', authentication, user.getOneUser);
router.post('/user', authentication, user.createUser);
router.put('/user/:id', authentication, user.updateUser);
router.delete('/user/:id', user.removeUser);

module.exports = router;