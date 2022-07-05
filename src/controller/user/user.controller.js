const bcrypt = require("bcrypt");
const users = require("../../model/user");
const { createToken } = require("../../helper/index");

exports.createUser = async (req, res) => {
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

    const user = await users.findOne({email});
    if(user){
      return res.status(400).json({
        message: "Email id already exist.",
      });
    }

    const newUser = await users.create(payload);
    const token = createToken(newUser);

    return res.status(201).json({
      message: "User created successfully.",
      Token: token,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error while creating User.",
      error: error.message,
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await users.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "Email not Found.",
      });
    }

    const result = await bcrypt.compare(password, user.password);
    if (!result) {
      return res.status(403).json({
        message: "password is incorrect.",
      });
    }

    const token = createToken(user);
    return res.status(201).json({
      message: "User login successfully.",
      Token: token,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error while login.",
      error: error.message,
    });
  }
};

exports.getAllUser = async (req, res) => {
  try {
    const userData = await users.find(
      {},
      { password: 0, __v: 0, createdAt: 0, updatedAt: 0 }
    );

    return res.status(200).json({
      message: "All users fetch Successfully.",
      Data: userData,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error while fetch Users.",
      error: error.message,
    });
  }
};

exports.getOneUser = async (req, res) => {
  const { id } = req.params;

  await users
    .findById(id, { password: 0, __v: 0, createdAt: 0, updatedAt: 0 })
    .then((data) => {
      return res.status(200).json({
        message: "User fetch Successfully.",
        Data: data,
      });
    })
    .catch((error) => {
      return res.status(400).json({
        message: "Error while fetch User.",
        error: error.message,
      });
    });
};
