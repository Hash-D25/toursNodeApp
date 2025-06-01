const mongoose=require('mongoose');
//Making a schema
const tourSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'A tour must have a name'],
        unique:true
    },
    rating:{
        type:Number,
        default:4.5,
    },
    price:{
        type:Number,
        required:[true, 'A tour must have a price']
    },
});

//Creating a model
// Model is a class with which we can create and read documents from the underlying MongoDB database.
const Tour=mongoose.model('Tour',tourSchema);

module.exports=Tour;
