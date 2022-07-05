const jwt = require('jsonwebtoken');

module.exports.createToken = (data) => {
  const newData = {
    id: data._id,
    name: data.name,
    username: data.username,
    email: data.email,
    password: data.password,
    age: data.age,
  };
  const token = jwt.sign(newData, process.env.SECRET, { expiresIn: '1h' });
  return token;
};

// module.exports.successResponse(req, res,)