const express = require('express');
const { get } = require('http');
const app=express();

app.use(express.json());
const tourRouter=require('./routes/tourRoutes');
const userRouter=require('./routes/userRoutes');
 
app.use((req,res,next)=>{
    req.requestTime=new Date().toISOString();
    console.log(req.headers);
    next();
});

app.use('/api/v1/tours',tourRouter);
app.use('/api/v1/users',userRouter);


module.exports=app;