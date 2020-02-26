const jwt = require('jsonwebtoken');
const User = require("../models/user");

module.exports = (app) => {
    // Sign Up Form
    app.get("/sign-up", (req, res) => {
        res.render("sign-up");
    });

    // Sign Up POST
    app.post("/sign-up", (req, res) => {
        // Create User and JWT
        const user = new User(req.body);

        user
        .save()
        .then(user => {
            const token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: "60 days" });
            res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
            res.redirect('/');
        })
        .catch(err => {
            console.log(err.message);
            return res.status(400).send({ err:err });
        });
    });

    // Logout
    app.get('/logout', (req, res) => {
        res.clearCookie('nToken');
        res.redirect('/');
    });

    // Login Form
    app.get('/login', (req, res) => {
        const currentUser = req.user;

        res.render('login');
    });

    // Login POST
    app.post('/login', (req, res) => {
        const username = req.body.username;
        const password = req.body.password;
        // Find this username
        User.findOne({ username }, "username password")
            .then(user => {
                if (!user) {
                    // User not found
                    return res.status(401).send({ message: "Wrong Username or Password" });
                }
                // Check password
                user.comparePassword(password, (err, isMatch) => {
                    if (!isMatch) {
                        // Password doesn't match
                        return res.status(401).send({ message: "Wrong Username or Password" });
                    }
                    // Create a token: payload (data we're sending) is user id and storing it with secret key and add header info (meta data)
                    const token = jwt.sign({ _id: user._id, username: user.username }, process.env.SECRET, {
                        expiresIn: "60 days"
                    });
                    //Set a cookie and redirect to root (make payload into a cookie and send with the response)
                    res.cookie("nToken", token, { maxAge: 900000, httpOnly: true });
                    res.redirect('/');
                });
            })
            .catch(err => {
                console.log(err);
            });
    });
};