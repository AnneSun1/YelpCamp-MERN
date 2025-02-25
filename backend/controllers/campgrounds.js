const campground = require('../models/campground');
const { cloudinary } = require("../cloudinary");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding")
const mapBoxToken = process.env.MAPBOX_TOKEN;
mbxGeocoding({accessToken: mapBoxToken});
const geocoder = mbxGeocoding({ accessToken: mapBoxToken });

// Fixed
module.exports.index = async(req, res) => {
    const campgrounds = await campground.find({});
    // console.log(campgrounds);
    res.json(campgrounds);
};

// fixed
module.exports.addCamp= (req, res) => {
    res.status(200).json({ message: 'Camp added', review });
};

// not fixed
module.exports.createCampground = async (req, res, next) => {
    const geoData = await geocoder.forwardGeocode({
        query: req.body.campground.location,
        limit: 1
    }).send()
    const camp = new campground(req.body.campground);
    camp.geometry = geoData.body.features[0].geometry;
    camp.images = req.files.map(f => ({url: f.path, filename: f.filename}))
    camp.author = req.user._id;
    await camp.save();
    console.log(camp);
    req.flash('success', 'Successfully made a new campground!');
    res.redirect(`http://localhost:3000/campgrounds/${camp._id}`); 
};

// fixed
module.exports.showCampground = async(req, res) => {
    const camp = await campground.findById(req.params.id).populate({
        path: 'reviews', 
        populate: {
            path: 'author'
        }
    }).populate('author');
    if (!camp) {
        req.flash('error', 'Cannot find that campground!');
        // return res.redirect('/campgrounds');
        res.status(404).json({message: "Cannot find that campground" })
    }
    res.json(camp);
}

module.exports.renderEdit = async (req, res) => {
    const { id } = req.params;
    const camp = await campground.findById(id);
    if (!camp){
        req.flash('error', 'Cannot find that campground!');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/edit', {camp});
}

module.exports.updateCampground = async(req, res) => {
    const { id } = req.params;
    //console.log(req.body);
    const camp = await campground.findByIdAndUpdate(id, {...req.body.camp }, {new: true});
    const imgs = req.files.map(f => ({url: f.path, filename: f.filename}));
    camp.images.push(...imgs);
    await camp.save()
    if(req.body.deleteImages) {
        for(let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename);
        }
        await camp.updateOne({$pull: {images: {filename: {$in: req.body.deleteImages}}}})
        console.log(camp)
    }
    
    req.flash('success', 'Successfully updated campground!');
    res.redirect(`/campgrounds/${camp._id}`);
};

module.exports.deleteCampground = async(req, res) => {
    const { id } = req.params;
    await campground.findByIdAndDelete(id);
    req.flash('success', 'Deleted campground!');
    res.redirect('/campgrounds');
}