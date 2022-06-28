const jwt=require('jsonwebtoken');

module.exports=async function(req,res,next){
  let token=req.header('Authorization');

  if(!token) return res.status(401).send('Access Denied.No Token Provided!!');

  else token=token.split(' ')[1].trim();

  const decoded=await jwt.verify(token,process.env.JWT_SECRET_KEY);
  if(!decoded) return res.status(400).send('Invalid Token!!');

  req.user=decoded;
  next();

}