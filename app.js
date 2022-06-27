const express = require('express');
const app=express();
const cors = require('cors');
const morgan=require('morgan');
const userRouter=require('./routers/userRouter');

app.use(express.json());
app.use(cors());

if(process.env.NODE_ENV==='development'){
  app.use(morgan('dev'));
}

app.use('/api/user',userRouter);



module.exports = app;