const jwt = require('jsonwebtoken');
const ResponseFormatter = require("../utils/ResponseFormatter");
const db = require('../models');
const Users = db.user_master

module.exports = async (req, res, next) => {
  try {
    
    const SECRET = 'secreatnoteforfestivalapp';
    const usertoken = req.headers.authorization;
    // const token = usertoken.split(' ');
    const token = usertoken;
    const JWT_TOKEN = token;
    const decoded = await jwt.verify(JWT_TOKEN, SECRET);
    
    const userId = decoded.userId;
    const user = await Users.findByPk(userId);
    
    if (!user) {
      res.status(401).json(ResponseFormatter.setResponse(false, 401, 'User not found!', 'Error', ''));
    } else {
      req.user = user
      next();
    }

  } catch(error) {
    console.log(error);
    res.status(401).json(ResponseFormatter.setResponse(false, 401, error.message, 'Error', ''));
  }
};