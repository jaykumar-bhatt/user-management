const express = require("express");
const user = require("../controller/user/user.controller");
const { authentication } = require("../middleware/authentication");
const {
  userAddValidation,
  userUpdateValidation,
  loginValidation,
} = require("../controller/user/user.validator");

const router = express.Router();

// Public APIs
router.post("/signin", userAddValidation, user.createUser);
router.post("/login", loginValidation, user.login);

// Protected APIs
router.get("/user", authentication, user.getAllUser);
router.get("/user/profile", authentication, user.getOneUser);
router.post("/user", authentication, userAddValidation, user.createUser);
router.put("/user/:id", authentication, userUpdateValidation, user.updateUser);
router.delete("/user/:id", authentication, user.removeUser);

module.exports = router;
