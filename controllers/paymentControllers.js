const {CartItem}=require('../models/cartItem');
const SSLCommerz = require("ssl-commerz-node");
const PaymentSession = SSLCommerz.PaymentSession;

module.exports.initPayment=async(req,res)=>{

  const userId=req.user._id;
  const cartItems=await CartItem.find({user:userId});

  const total_amount=cartItems.map(item=>item.count*item.price).reduce((a,b)=>a+b,0);
  const tran_id='_'+Math.random().toString(36).substr(2,9)+(new Date()).getTime();


  // For live payment set first parameter `false` and for sandbox set it `true`
const payment = new PaymentSession(
  true,
  process.env.SSLCOMMERZ_STORE_ID,
  process.env.SSLCOMMERZ_STORE_PASSWORD
);
// Set the urls
payment.setUrls({
  success: "yoursite.com/success", // If payment Succeed
  fail: "yoursite.com/fail", // If payment failed
  cancel: "yoursite.com/cancel", // If user cancel payment
  ipn: "yoursite.com/ipn", // SSLCommerz will send http post request in this link
});

// Set order details
payment.setOrderInfo({
  total_amount: total_amount, // Number field
  currency: "BDT", // Must be three character string
  tran_id: tran_id, // Unique Transaction id
  // emi_option: 0, // 1 or 0
  // multi_card_name: "internetbank", // Do not Use! If you do not customize the gateway list,
  // allowed_bin: "371598,371599,376947,376948,376949", // Do not Use! If you do not control on transaction
  // emi_max_inst_option: 3, // Max instalment Option
  // emi_allow_only: 0, // Value is 1/0, if value is 1 then only EMI transaction is possible
});

// Set customer info
payment.setCusInfo({
  name: "Simanta Paul",
  email: "simanta@bohubrihi.com",
  add1: "66/A Midtown",
  add2: "Andarkilla",
  city: "Chittagong",
  state: "Optional",
  postcode: 4000,
  country: "Bangladesh",
  phone: "010000000000",
  fax: "Customer_fax_id",
});

// Set shipping info
payment.setShippingInfo({
  method: "Courier", //Shipping method of the order. Example: YES or NO or Courier
  num_item: 2,
  name: "Simanta Paul",
  add1: "66/A Midtown",
  add2: "Andarkilla",
  city: "Chittagong",
  state: "Optional",
  postcode: 4000,
  country: "Bangladesh",
});

// Set Product Profile
payment.setProductInfo({
  product_name: "Computer",
  product_category: "Electronics",
  product_profile: "general",
});
  
}