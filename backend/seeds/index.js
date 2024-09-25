
const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp'); // db name

const db = mongoose.connection; // just to shorten code
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});
const sample = (array) => array[Math.floor(Math.random() * array.length)]

const seedDB = async() => {
    await campground.deleteMany({});
    for(let i = 0; i< 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new campground({
            author: '6631b3be11d747e252b51a08',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [
                {
                  url: 'https://res.cloudinary.com/dvjscytzj/image/upload/v1715128362/YelpCamp/klhyawyqshdfhfbxqyio.jpg'
                },
                {
                  url: 'https://res.cloudinary.com/dvjscytzj/image/upload/v1715779356/YelpCamp/xqjaa4xh1pyuexqgmzs6.jpg',
                  filename: 'YelpCamp/xqjaa4xh1pyuexqgmzs6'
                }
              ],
            description: 'Cold campground',
            price,
            geometry: {
                type: "Point",
                coordinates: [-113.1331, 47.0202]
            }
        })
        await camp.save();
    }
   
}

seedDB().then(() => {
    mongoose.connection.close();
})