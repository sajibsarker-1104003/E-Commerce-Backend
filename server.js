require('dotenv/config');
const app=require('./app');

const mongoose = require('mongoose');
const { replace } = require("lodash");

const DB=process.env.MONGODB_SERVER.replace('<PASSWORD>',process.env.DB_PASSWORD);
mongoose.connect(DB)
.then(()=>{
  console.log('Connected Succesfully!');
})
.catch(err=>console.error('MongoDB Connection Failed!!'));

const port=process.env.PORT||3001;

app.listen(port,()=>{
  console.log(`App Running on ${port}`);
})



