const jwt = require("jsonwebtoken");
const { errorResponse } = require("../helper/index");

// Authentication Middelware
exports.authentication = async (req, res, next) => {
  try {
    const authToken = req.headers.authorization;

    if (!authToken) {
      return errorResponse(req, res, "Token not found", 404);
    }

    const verifyToken = authToken.split(" ")[1];

    jwt.verify(verifyToken, process.env.SECRET, (error, user) => {
      if (error) {
        return errorResponse(req, res, "You are not authorize.", 403);
      }
      req.user = user;

      next();
    });
  } catch (error) {
    return errorResponse(req, res, "Error in authentication.", 500);
  }
};
