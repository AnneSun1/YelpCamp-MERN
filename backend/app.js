if (process.env.NODE_ENV !== "production") {
    require('dotenv').config()
}

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const ExpressError = require('./utils/ExpressError');

// connecting front and back
const cors = require("cors");
// allows this api to ONLY take reqs from out fronend
const corsOptions = {
    origin: ["http://localhost:3000"],
    credentials: true,
}



//const Joi = require('joi');
const session = require('express-session');
const flash = require('connect-flash')
const passport = require('passport');
const LocalStrategy = require('passport-local');

// Models
const campground = require('./models/campground');
const Review = require('./models/review');
const User = require('./models/user');

// Routes
const users = require('./routes/users')
const campgrounds = require('./routes/campgrounds');
const reviews = require('./routes/reviews');

mongoose.connect('mongodb://localhost:27017/yelp-camp'); // db name

const db = mongoose.connection; // just to shorten code
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const app = express();

app.use(cors(corsOptions));

// getting react build
app.use(express.static(path.join(__dirname, '../frontend/my-app/build')));


// middleware:
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

const sessionConfig = {
    secret: 'thisshouldbeabettersecret!',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}
app.use(session(sessionConfig));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

// storing and unstoring user
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    // console.log(req.session);
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

// campground router
app.use('/', users);
app.use('/campgrounds', campgrounds);
app.use('/campgrounds/:id/reviews', reviews);

app.get('/', (req, res) => {
    console.log("sent")
    res.sendFile(path.join(__dirname, '../frontend/my-app/build', 'index.html'));
    
})

// for all paths and callbacks that don't exist
app.all('*', (req, res, next) => {
    console.log("404");
    next(new ExpressError('Page Not Found', 404));
})
app.use((err, req, res, next) => {
    const {statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh No, Something Went Wrong!'
    res.status(statusCode);
})

app.listen(3010, ()=> {
    console.log('Serving on port 3010');
});