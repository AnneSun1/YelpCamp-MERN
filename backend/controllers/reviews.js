const Review = require('../models/review');
const campground = require('../models/campground');

// fixed
module.exports.createReview = async(req, res) => {
    const camp = await campground.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    camp.reviews.push(review);
    await review.save()
    await camp.save()
    console.log('Created new review!');
    return res.status(200).json({ message: 'Review created successfully', review });
}


module.exports.deleteReview = async(req, res) => {
    const { id, reviewId } = req.params;
    await campground.findByIdAndUpdate(id, {$pull: { reviews: reviewId }});
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Successfully deleted review!');
    return res.status(200).json({ message: 'Review deleted successfully'});
    // res.redirect(`/campgrounds/${id}`);
}