const bcrypt = require("bcrypt");
const users = require("../../model/user");
const { createToken, successResponse, errorResponse } = require("../../helper/index");

exports.createUser = async (req, res) => {
  try {
  const password = bcrypt.hashSync(req.body.password, 10);
  const { name, username, email, age } = req.body;

    const payload = {
      name,
      username,
      email,
      password,
      age,
    };

    const user = await users.findOne({email});
    if(user){
      return errorResponse(req, res, "Email id already exist.", 400);
    }

    const newUser = await users.create(payload);
    const token = createToken(newUser);

    return successResponse(req, res, "User created successfully.", {"token":token}, 201);
  } catch (error) {
    return errorResponse(req,res,"Error while creating User.", 500, error.message);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await users.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "Email not found.",
      });
    }

    const result = await bcrypt.compare(password, user.password);
    if (!result) {
      errorResponse(req,res,"Password is incorrect.", 403) 
    }

    const token = createToken(user);
    return successResponse(req,res,"User login successfully.", {"token":token}, 201)
  } catch (error) {
    return errorResponse(req, res, "Error while login.", 500, error.message);
  }
};

exports.getAllUser = async (req, res) => {
  try {
    const userData = await users.find(
      {},
      { password: 0, __v: 0, createdAt: 0, updatedAt: 0 }
    );

    return successResponse(req, res, "All users fetch successfully.", userData, 200);
  } catch (error) {
    return errorResponse(req, res, "Error while fetch users.", 500, error.message);
  }
};

exports.getOneUser = async (req, res) => {
  try {
    const user = req.user

    const userData = await users.findById(
      user.id,
      { password: 0, __v: 0, createdAt: 0, updatedAt: 0 }
    );

    successResponse(req, res, "User data fetch successfully.", userData, 200);
  } catch (error) {
    return errorResponse(req, res,"Error while fetch users.", 500, error.message);
  }
};

exports.updateUser = async (req, res) => {
  try{
    const { id } = req.params
    const { name, username, email, age } = req.body;
    
    const payload = {
      name,
      username,
      email,
      age,
    };

    await users.findByIdAndUpdate(id,payload);
    
    return successResponse(req, res, "User data update successfully.", null, 201);
  } catch (error) {
    return errorResponse(req, res, "Error while update user.", 500, error.message);
  }
}

exports.removeUser = async (req, res) => {
  try{
    const { id } = req.params
    const user = await users.findById(id);

    if(!user) {
      return errorResponse(req, res, "User not found.", 404);
    }

    await users.findByIdAndDelete(id);

    return successResponse(req, res, "User delete successfully.", null, 200);
  } catch (error) {
    return errorResponse(req, res, "Error while delete user.", 500, error.message);
  }
}
