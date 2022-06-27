const express=require('express');
const router=express.Router();

const {signIn,signUp}=require('../controllers/userControllers');

router.route('/signup')
.post(signUp);

router.route('/signIn')
.post(signIn);


module.exports = router;