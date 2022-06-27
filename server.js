require('dotenv/config');
const app=require('./app');

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URL_LOCAL)
.then(()=>{
  console.log('Connected Succesfully!');
})
.catch(err=>console.error('MongoDB Connection Failed!!'));

const port=process.env.PORT||3001;

app.listen(port,()=>{
  console.log(`App Running on ${port}`);
})



