
require('express-async-errors');
const express = require('express');
const app=express();


require('./middlewares/index')(app);
require('./middlewares/routes')(app);


app.use((err,req,res,next)=>{
  return res.status(500).send('Something Wrong!!!');
})



module.exports = app;