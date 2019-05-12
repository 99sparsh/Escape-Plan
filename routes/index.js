const router = require('express').Router();
const auth = require('./auth')
router.get('/',(req,res)=>{
    res.send("Spotlight Functioning");
});
router.post('/auth/register',auth.register);
module.exports = router;