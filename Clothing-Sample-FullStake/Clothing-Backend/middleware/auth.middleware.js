

const jwt = require("jsonwebtoken");
const accountModel = require("../models/account.model");
require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY;

async function authMiddleware(req, res, next) {
    const authorization = req.headers.authorization;

    if(!authorization) {
      return res.status(400).json({message: 'not authorized'})
    }

    
    
    const token = authorization.split(" ")[1];
   

    const decoded = jwt.verify(token, SECRET_KEY);
    

    const account = await accountModel.findById(decoded.id);

    console.log(account,'acc');
    
    
    req.account = account;

    next(); 
  
}

module.exports = authMiddleware;
