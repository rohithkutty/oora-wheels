const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const passport = require('passport');

// config key parameters
const keys = require('../../config/keys');

// Load User model
const User = require("../../models/Users");

// @route  GET /api/users/test
// @desc   Tests post route
// @access Public

router.get("/test", (req, res) => res.json({ msg: "User works" }));

// @route  GET /api/users/register
// @desc   Tests post route
// @access Public

router.post("/register", (req, res) => {
    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            return res.status(400).json({
                message: "email already exists"
            });
        } else {
            const avatar = gravatar.url(req.body.email, {
                s: 200, //size of image
                d: "mm", //default
                r: "pg" //Rating
            });

            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                avatar: avatar,
                gender: req.body.gender,
                password: req.body.password
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => res.json({
                            message: "registered"
                        }))
                        .catch(err => console.log(err));
                });
            });
        }
    });
});

// @route  GET /api/users/login
// @desc   login post route
// @access Public

router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    //Find user by email
    User.findOne({ email }).then(user => {
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                // User matched
                const payload = {
                    id: user.id,
                    name: user.name,
                    avatar: user.avatar
                };

                // JWT sign
                jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
                    res.json({
                        success: true,
                        token: 'Bearer ' + token
                    });
                });

            } else {
                return res.status(400).json({ message: 'Password incorrect' });
            }
        });
    });
});

// @route  GET /api/users/current
// @desc   Return current user
// @access Private

router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    });
});

module.exports = router;