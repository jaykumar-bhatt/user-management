const joi = require("joi");
const { errorResponse } = require("../../helper");

// Add User Validation
const userAddObj = joi.object({
  name: joi.string().trim(true),
  username: joi.string().trim(true).required(),
  password: joi.string().required(),
  email: joi.string().email().required(),
  age: joi.number().required(),
});

const userAddValidation = async (req, res, next) => {
  const { name, username, email, password, age } = req.body;

  const payload = {
    name,
    username,
    password,
    email,
    age,
  };

  const { error } = userAddObj.validate(payload);
  if (error) {
    return errorResponse(req, res, "Validation error.", 400, error.message);
  }
  next();
};

// Update User Validation
const userUpdateObj = joi.object({
  name: joi.string().trim(true),
  username: joi.string().trim(true),
  email: joi.string().email(),
  age: joi.number(),
});

const userUpdateValidation = async (req, res, next) => {
  const { name, username, email, age } = req.body;

  const payload = {
    name,
    username,
    email,
    age,
  };

  const { error } = userUpdateObj.validate(payload);
  if (error) {
    return errorResponse(req, res, "Validation error.", 400, error.message);
  }
  next();
};

// Login User Validation
const loginObj = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});

const loginValidation = async (req, res, next) => {
  const { email, password } = req.body;

  const payload = {
    email,
    password,
  };

  const { error } = loginObj.validate(payload);
  if (error) {
    return errorResponse(req, res, "Validation error.", 400, error.message);
  }
  next();
};

module.exports = { userAddValidation, userUpdateValidation, loginValidation };
