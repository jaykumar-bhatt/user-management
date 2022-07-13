const jwt = require("jsonwebtoken");

// create token using jwt
module.exports.createToken = (data) => {
  const newData = {
    id: data._id,
    name: data.name,
    username: data.username,
    email: data.email,
    password: data.password,
    age: data.age,
  };
  const token = jwt.sign(newData, process.env.SECRET, { expiresIn: "1h" });
  return token;
};

//success response
module.exports.successResponse = (req, res, message, data, code = 200) =>
  res.status(code).json({
    message,
    data,
    success: true,
  });

//error response
module.exports.errorResponse = (
  req,
  res,
  errorMessage = "Something went wrong",
  code = 500,
  error = {}
) =>
  res.status(code).json({
    errorMessage,
    error,
    success: false,
  });

module.exports.userProjection = {
  name: 1,
  username: 1,
  email: 1,
  age: 1,
};
