const router = require('express').Router();
const validator = require('../utils/validator');


const authSchema = require('../schemas/auth');
const adminSchema = require('../schemas/admin');
const homeSchema = require('../schemas/home');

const auth = require('./auth');
const admin = require('./admin');
const home = require('./home');


const redirectIfLoggedIn = (req, res, next) => {
    if (req.isAuthenticated())
      return res.redirect('/home');
    return next();
  }
  
  const authenticate = (req, res, next) => {
    if (req.isAuthenticated())
      return next();
    return res.redirect('/');
  }

  const access = level => (req, res, next) => {
    if (req.user && req.user.access >= level)
        return next();
    return res.sendError(null, 'Unauthorized access');
  };

//TODO: Add register/login front end for / route
router.get('/',(req,res)=>{
    res.send("Spotlight Functioning");
});


//Authentication routes

router.post('/auth/register',redirectIfLoggedIn,validator(authSchema.register),auth.register);
router.post('/auth/login',redirectIfLoggedIn,validator(authSchema.login),auth.login);
router.get('/auth/logout',authenticate,auth.logout);
router.post('/auth/forgotpassword',redirectIfLoggedIn,validator(authSchema.forgot),auth.forgotpassword);
router.post('/auth/resetpassword',redirectIfLoggedIn,auth.resetpassword);

//add question admin route
router.post('/admin/addquestion',authenticate,access(20),validator(adminSchema.question),admin.addQuestion);

//submit user
router.post('/home/submit',authenticate,validator(homeSchema.home),home.submit);
//home user
router.get('/home',authenticate,home.home);

module.exports = router;