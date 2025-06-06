const express = require('express');
const rateLimit = require('express-rate-limit');
const AppError = require('./utils/appError.js'); // Corrected path
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const app = express();
const morgan = require('morgan');

// console.log(process.env.NODE_ENV);
//GLOBAL MIDDLEWARES
// 'development' or 'production
if (process.env.NODE_ENV === 'development') {
  // If not in development mode, use morgan for logging
  app.use(morgan('dev'));
}

const limiter = rateLimit({
  max: 100, // Limit each IP to 100 requests per windowMs
  windowMs: 60 * 60 * 1000, // 1 hour
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api', limiter); // Apply rate limiting to all API routes

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.headers);
  next();
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// Middleware to handle undefined routes
app.use((req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

//Global error handling middleware
app.use(globalErrorHandler);

module.exports = app;
