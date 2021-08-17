const User = require('../models/user');
const jwt = require('jsonwebtoken'); // to generate signed token
const expressJwt = require('express-jwt'); // for authorization check
const { errorHandler } = require('../helpers/dbErrorHandler');
const logger=require("../config/logger");


 exports.signup = async (req, res) => {
    try {
       
        const users = new User(req.body);
        let user = await User.findOne({email:req.body.email});
        if(user)return res.status(400).send("Failed");
        await users.save();
        res.status(200).send("Successful");      
    } catch (err) {
         console.error(err.message);
     }
 };

exports.signin =  (req, res) => {
   // find the user based on email
        
       const { email, password } = req.body;
       User.findOne({ email }, (err, user) => {
       if (err || !user) {
           return res.status(400).send("User with that email does not exist");
       }
       // if user is found make sure the email and password match
       // create authenticate method in user model
       if (!user.authenticate(password)) {
           return res.status(400).send("Email and password dont match");
       }
       // generate a signed token with user id and secret
       const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
       // persist the token as 't' in cookie with expiry date
       res.cookie('t', token, { expire: new Date() + 9999 });
       // return response with user and token to frontend client
       const { _id, name, email, role } = user;
       
       logger.info(user);
       return res.send({'responseCode':'00','responseMessage':'Successful', token, user: { _id, email, name, role } });
   });
      
     
  
};
exports.userById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User not found'
            });
        }
        req.profile = user;
        next();
    });
};
exports.read = (req, res) => {
    return res.json(req.user);
    next();
};
exports.signout = (req, res) => {
    res.clearCookie('t');
    res.json({ message: 'Signout success' });
};

exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET || "unsecured" ,
    userProperty: 'auth',
    algorithms: ['HS256'],
});
exports.isAuth = (req, res, next) => {
    let user = req.auth._id;
    console.log("Request Profile"+ req.profile);
    console.log("Request Auth"+ req.auth._id);
    
    if (!user) {
        return res.status(403).json({
            error: 'Access denied'
        });
    }
    next();
};
exports.isUser = (req, res, next) => {
    logger.info(req.profile.role);
    if (req.profile.role === 0) {
        return res.status(403).json({
            error: 'Admin resourse! Access denied'
        });
    }
    next();
};


exports.Access=  (req, res, next) =>{

    const token = req.header('auth-token');
    if (!token) return res.status(401).send('Access Denied');

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user - verified;
        next();

    } catch (err) {
res.status(400).send('Invalid Token')
    }
};


