const User = require('../models/user')

// fixed
module.exports.register = async(req, res, next) => {
    try {
        const {email, username, password} = req.body;
        const user = new User({email, username});
        const registeredUser = await User.register(user, password);
        // console.log(req.body);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'Welcome to Yelp Camp!');
            console.log("success");
            res.redirect('http://localhost:3000/campgrounds');

        })
    } catch(e) {
        console.log(req.body);
        console.log(e.message);
        
        req.flash('error', e.message); // flashes error message
        res.redirect('register');
    }
}

// might not need
module.exports.renderLogin = (req, res) => {
    res.render('users/login');
}

// half fixed
module.exports.login = (req, res) => {
    req.flash('success', 'Welcome back!');
    // req.session.returnTo || 
    // const redirectUrl = 'http://localhost:3000/campgrounds';
    // delete req.session.returnTo;
    console.log('http://localhost:3000/campgrounds');
    return res.status(200).json({ message: "Success" });
}

// fixed
module.exports.logout = (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.status(200);
    });
}