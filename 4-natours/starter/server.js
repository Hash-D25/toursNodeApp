const dotenv=require('dotenv');
const mongoose=require('mongoose');

process.on('uncaughtException', err => {
    console.log('🔴 UNCAUGHT EXCEPTION! Shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
});

dotenv.config({path: './config.env'});
const app=require('./app');
// console.log(app.get('env')); // 'development' or 'production'

// console.log(process.env); // { NODE_ENV: 'development', PORT: '3000', ... }
const DB=process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD);

// This will trigger unhandledRejection
const testUnhandledRejection = () => {
    Promise.reject(new Error('This is an unhandled rejection'));
};

mongoose
  .connect(DB)
  .then(() => console.log('DB connection successful!'));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});



