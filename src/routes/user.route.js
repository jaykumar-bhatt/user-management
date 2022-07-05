const express = require('express');
const user = require('../controller/user/user.controller');
const {auth} = require('../middleware/authentication')
const router = express.Router();

// APIs
router.post('/signin',user.createUser);
router.post('/login',user.login);

router.get('/user',auth,user.getAllUser);
router.get('/user/:id',user.getOneUser);


module.exports = router;