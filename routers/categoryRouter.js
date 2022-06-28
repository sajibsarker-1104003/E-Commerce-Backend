const express = require('express');
const router=express.Router();
const {createCategory,getCategory} =require('../controllers/categoryControllers');
const admin=require('../middlewares/admin');
const authorize=require('../middlewares/authorize');

router.route('/')
  .post([authorize,admin],createCategory)
  .get(getCategory);

  module.exports=router;