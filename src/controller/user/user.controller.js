const bcrypt = require("bcrypt");
const Users = require("../../model/user");
const {
  createToken,
  successResponse,
  errorResponse,
  userProjection,
} = require("../../helper/index");

// Create User
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

    const user = await Users.exists({ email }).lean();

    // Check Email already exists
    if (user) {
      return errorResponse(req, res, "Email id already exist.", 400);
    }

    const newUser = await Users.create(payload);
    const token = createToken(newUser);

    return successResponse(
      req,
      res,
      "User created successfully.",
      { token: token },
      201
    );
  } catch (error) {
    return errorResponse(
      req,
      res,
      "Error while creating User.",
      500,
      error.message
    );
  }
};

// Login User
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email }).lean();

    // Check Email not exists
    if (!user) {
      return res.status(404).json({
        message: "Email not found.",
      });
    }

    // Compare password
    const result = await bcrypt.compare(password, user.password);
    if (!result) {
      errorResponse(req, res, "Password is incorrect.", 403);
    }

    const token = createToken(user);
    return successResponse(
      req,
      res,
      "User login successfully.",
      { token: token },
      201
    );
  } catch (error) {
    return errorResponse(req, res, "Error while login.", 500, error.message);
  }
};

// Show All Users
exports.getAllUser = async (req, res) => {
  try {
    const userData = await Users.find().select(userProjection).lean();

    return successResponse(
      req,
      res,
      "All Users fetch successfully.",
      userData,
      200
    );
  } catch (error) {
    return errorResponse(
      req,
      res,
      "Error while fetch Users.",
      500,
      error.message
    );
  }
};

// Show Particular User
exports.getOneUser = async (req, res) => {
  try {
    const user = req.user;

    const userData = await Users.findById(user.id)
      .select(userProjection)
      .lean();

    successResponse(req, res, "User data fetch successfully.", userData, 200);
  } catch (error) {
    return errorResponse(
      req,
      res,
      "Error while fetch Users.",
      500,
      error.message
    );
  }
};

// Update User
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, username, email, age } = req.body;

    const user = await Users.exists({ email }).select("_id").lean();

    // Check Email already exists
    if (user && user._id != id) {
      return errorResponse(req, res, "Email already exists.", 403);
    }

    const payload = {
      name,
      username,
      email,
      age,
    };

    await Users.findByIdAndUpdate(id, payload);

    return successResponse(
      req,
      res,
      "User data update successfully.",
      null,
      201
    );
  } catch (error) {
    return errorResponse(
      req,
      res,
      "Error while update user.",
      500,
      error.message
    );
  }
};

// delete User
exports.removeUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Users.exists({ _id: id });

    // Check if user not exists
    if (!user) {
      return errorResponse(req, res, "User not found.", 404);
    }

    await Users.findByIdAndDelete(id);

    return successResponse(req, res, "User delete successfully.", null, 200);
  } catch (error) {
    return errorResponse(
      req,
      res,
      "Error while delete user.",
      500,
      error.message
    );
  }
};
