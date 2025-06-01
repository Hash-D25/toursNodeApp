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


const port=3000;
app.listen(port, () => {
    console.log(`🟢Server is running on http://localhost:${port}`);
});