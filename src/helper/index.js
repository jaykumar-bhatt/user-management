const jwt = require('jsonwebtoken');

module.exports.createToken = (data) => {
  const newData = {
    name: data.name,
    username: data.username,
    email: data.email,
    password: data.password,
    age: data.age,
  };
  const token = jwt.sign(newData, process.env.SECRET);
  return token;
};