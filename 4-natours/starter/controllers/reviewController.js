const Review = require('../models/reviewModel');
const catchAsync = require('../utils/catchAsync');

exports.getAllReviews = catchAsync(async (req, res, next) => {
  const reviews = await Review.find();

  res.status(200).json({
    status: 'success',
    results: reviews.length,
    data: {
      reviews,
    },
  });
});

exports.createReview = catchAsync(async (req, res, next) => {
  // Allow nested routes for creating reviews
  if (!req.body.tour) req.body.tour = req.params.tourId; // If tour ID is not provided in the body, use the one from the URL
  if (!req.body.user) req.body.user = req.user.id; // If user ID is not provided in the body, use the authenticated user's ID
  const newReview = await Review.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      review: newReview,
    },
  });
});
