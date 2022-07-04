const router=require('express').Router();
const {createCartItem,getCartItem,updateCartItem,deleteCartItem}=require('../controllers/cartControllers');
const authorize=require('../middlewares/authorize');


router.route('/')
.get(authorize,getCartItem)
.post(authorize,createCartItem)
.put(authorize,updateCartItem)

router.route('/:id')
.delete(authorize,deleteCartItem)

module.exports=router;