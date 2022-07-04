const {Schema,model}=require('mongoose');

const CartItemSchema=Schema({
  product:{
    type:Schema.Types.ObjectId,
    ref:'Product',
    required:true
  },
  price:Number,
  count:{
    type:Number,
    def:1,
    min:1,
    max:5
  },
  user:{
    type:Schema.Types.ObjectId,
    ref:'User',
    required:true
  }
},{timestamps:true});

module.exports.CartItemSchema=CartItemSchema;
module.exports.CartItem=model('CartItem',CartItemSchema);