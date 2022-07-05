const jwt = require('jsonwebtoken');

exports.auth = async (req, res, next) => {
  try { 
    const authToken = req.headers.authorization; 
    if(!authToken){
      res.status(404).json({
        message: "Token not found",
      });
    }
    const verifyToken = authToken.split(' ')[1];
    jwt.verify(verifyToken, process.env.SECRET, (error, user) => {
      if (error) {
        return res.status(403).json({
          message: "You are not authorize.",
          error: error.message,
        }); 
      }
      req.user = user;
      console.log(user)
      next();
    });
  } catch (error) {
    res.status(500).json({
      message: "Error in authentication.",
      error: error.message,
    });
  }
}