const express = require('express');
const { get } = require('http');
const tourRouter=require('./routes/tourRoutes');
const userRouter=require('./routes/userRoutes');
const app=express();
const morgan = require('morgan');

// console.log(process.env.NODE_ENV); // 'development' or 'production'
if(process.env.NODE_ENV==='development'){
  // If not in development mode, use morgan for logging
    app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));
 
app.use((req,res,next)=>{
    req.requestTime=new Date().toISOString();
    console.log(req.headers);
    next();
});

app.use('/api/v1/tours',tourRouter);
app.use('/api/v1/users',userRouter);


module.exports=app;