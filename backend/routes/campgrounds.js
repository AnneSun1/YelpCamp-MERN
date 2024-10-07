const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const {isLoggedIn, isAuthor, validateCampground } = require('../middleware');

// get campgrouns from contollers
const campgrounds = require('../controllers/campgrounds')

const multer = require('multer')
const { storage } = require('../cloudinary');
const upload = multer({ storage })

const campground = require('../models/campground');

router.route('/')
    // end up rendering /index ejs page
    .get(catchAsync(campgrounds.index))

    // new change(
    // .get((req, res) => {
        // res.send({
        //     initialData: campgrounds,
        //     html: await renderApp(),
        // });
        // console.log("sent");

        // campgrounds.forEach(campground => {
        //     console.log(campground);
        //   });

        // res.sendFile(path.join(__dirname, '../frontend/my-app/build', 'index.html'));
    // })

    .post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgrounds.createCampground))

const renderApp = async () => {
    return path.join(__dirname, '../frontend/my-app/build', 'index.html');

}
// order matters
router.get('/new', isLoggedIn, campgrounds.addCamp);

router.route('/:id')
    .get(catchAsync(campgrounds.showCampground))
    .put(isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(campgrounds.updateCampground))
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground))

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEdit));
module.exports = router;