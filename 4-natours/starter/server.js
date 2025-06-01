const dotenv=require('dotenv');
const mongoose=require('mongoose');

dotenv.config({path: './config.env'});
const app=require('./app');
// console.log(app.get('env')); // 'development' or 'production'

// console.log(process.env); // { NODE_ENV: 'development', PORT: '3000', ... }
const DB=process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD);

mongoose.connect(DB).then(() => {
    console.log('🟢DB connection successful! ');
}).catch(err => {
    console.error('🔴DB connection error:', err);
});

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

//Creating a new document
const testTour=new Tour({
    name:'The Park Camper',

    price:497
});

testTour.save().then(doc => {
    console.log('🟢Tour created:', doc);
}).catch(err => {
    console.error('🔴Error creating tour:', err);
});


const port=3000;
app.listen(port, () => {
    console.log(`🟢Server is running on http://localhost:${port}`);
});