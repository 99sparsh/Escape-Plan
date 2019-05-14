const router = require('express').Router();
const validator = require('../utils/validator');
const authSchema = require('../schemas/auth');


const auth = require('./auth')


router.get('/',(req,res)=>{
    res.send("Spotlight Functioning");
});


//Authentication routes
//TODO: Forgot Password
router.post('/auth/register',validator(authSchema.register),auth.register);
router.post('/auth/login',validator(authSchema.login),auth.login);
router.get('/auth/logout',auth.logout);
router.post('/auth/forgotpassword',validator(authSchema.forgot),auth.forgotpassword);
router.post('/auth/resetpassword',auth.resetpassword);


module.exports = router;