const Review = require('../models/reviewModel');
// const catchAsync = require('../utils/catchAsync');
const handlerFactory = require('./handlerFactory');

exports.setTourUserIds = (req, res, next) => {
  // Allow nested routes for creating reviews
  if (!req.body.tour) req.body.tour = req.params.tourId; // If tour ID is not provided in the body, use the one from the URL
  if (!req.body.user) req.body.user = req.user.id; // If user ID is not provided in the body, use the authenticated user's ID
  next();
};

exports.getAllReviews = handlerFactory.getAll(Review);
exports.getReview = handlerFactory.getOne(Review);
exports.createReview = handlerFactory.craeteOne(Review);

exports.updateReview = handlerFactory.updateOne(Review);

exports.deleteReview = handlerFactory.deleteOne(Review);
