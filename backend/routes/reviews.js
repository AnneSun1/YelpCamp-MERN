const express = require('express');
const router = express.Router({ mergeParams: true });
const { validateReview, isReviewAuthor, isLoggedIn } = require('../middleware.js')
//const { reviewSchema } = require('../schemas.js');
const campground = require('../models/campground');
const Review = require('../models/review');
const ExpressError = require('../utils/ExpressError');
const catchAsync = require('../utils/catchAsync');
// controller
const reviews = require('../controllers/reviews');

router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview));

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview));

module.exports = router;