const jwt = require('jsonwebtoken');

module.exports.createToken = (data) => {
  const newData = {
    enrollment: data.enrollment,
    name: data.name,
    email: data.email,
    password: data.password,
    gender: data.gender,
  };
  const token = jwt.sign(newData, process.env.SECRET);
  return token;
};