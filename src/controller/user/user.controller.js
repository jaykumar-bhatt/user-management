const bcrypt = require('bcrypt');
const users = require('../../model/user');
const { createToken } = require('../../helper/index');

exports.createUser = async (req,res) => {

  const password = bcrypt.hashSync(req.body.password, 10);
  const { name, username, email, age } = req.body;

  try {
    const payload = {
      name,
      username,
      email,
      password,
      age,
    };

    const newUser = await users.create(payload);
    const token = createToken(newUser);

    res.status(201).json({
      'message':'User created successfully.',
      'Token':token
    })

  } catch(error) {
    res.status(400).json({
      'message':'Error while creating User.',
      'error': error.message
    })
  }
}
