
require('express-async-errors');
const express = require('express');
const app=express();
const cors = require('cors');
const morgan=require('morgan');

const userRouter=require('./routers/userRouter');
const categoryRouter=require('./routers/categoryRouter');

app.use(express.json());
app.use(cors());

if(process.env.NODE_ENV==='development'){
  app.use(morgan('dev'));
}

app.use('/api/user',userRouter);
app.use('/api/category',categoryRouter);


app.use((err,req,res,next)=>{
  return res.status(500).send('Something Wrong!!!');
})



module.exports = app;