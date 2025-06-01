const { ServerDescription } = require('mongodb');
const mongoose=require('mongoose');
//Making a schema
const tourSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'A tour must have a name'],
        unique:true
    },
    duration:{
        type:Number,
        required:[true,'A tour must have a duration']
    },
    maxGroupSize:{
        type:Number,
        required:[true,'A tour must have a group size'] 
    },
    difficulty:{
        type:String,
        required:[true,'A tour must have a difficulty']
    },
    ratingsAverage:{
        type:Number,
        default:4.5
    },
    ratingsQuantity:{
        type:Number,
        default:0
    },
    price:{
        type:Number,
        required:[true, 'A tour must have a price']
    },
    priceDiscount:Number,
    summary:{
        type:String,
        trim:true,
    },
    description:{
        type:String,
        trim:true,
    },
    imageCover:{
        type:String,
        required:[true,'A tour must have a cover image']
    },
    images:[String],
    createdAt:{
        type:Date,
        default:Date.now(),
        select:false 
    },
    startDates:[Date],
});

//Creating a model
// Model is a class with which we can create and read documents from the underlying MongoDB database.
const Tour=mongoose.model('Tour',tourSchema);

module.exports=Tour;
