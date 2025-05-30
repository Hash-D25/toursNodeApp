const dotenv=require('dotenv');
dotenv.config({path: './config.env'});
const app=require('./app');
// console.log(app.get('env')); // 'development' or 'production'

// console.log(process.env); // { NODE_ENV: 'development', PORT: '3000', ... }

const port=3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});