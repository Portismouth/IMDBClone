var mongoose = require("mongoose");
var bcrypt = require("bcrypt-as-promised");
var session = require('express-session');
var User = mongoose.model("User");
var Review = mongoose.model("Review");

module.exports = {
    register: function (req, res) {
        var regErrors = [];

        if (req.body.passwordConf === null) {
            regErrors.push({ message: "Please enter a confirmation password" });
        }
        if (req.body.password !== req.body.passwordConf) {
            regErrors.push({ message: "Passwords must match!" });
        }

        if (regErrors.length !== 0) {
            res.send(regErrors);
        } else {
            var newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });

            newUser.save(function (err) {
                if (err) {
                    res.send(newUser.errors);
                } else {
                    req.session.userId = newUser._id;
                    res.send({ user: newUser, message: "success" })
                }
            })
        }
    },
    login: function (req, res) {
        console.log(req.body)
        User.findOne({ email: req.body.email }, function (err, user) {
            console.log(user, "line 40")
            if (err) {
                res.send(err)
            } else if (user === null) {
                res.send({ message: "Email is not in our database" })
            } else {
                bcrypt.compare(req.body.password, user.password)
                    .then(function (loggedIn) {
                        req.session.userId = user._id;
                        console.log(req.session.userId);
                        res.send({ message: "success", user: user });
                    })
                    .catch(function (loginError) {
                        console.log("line 53")
                        res.send({ message: "Email is not in our database" })
                    });
            }
        });
    },
    checkSession: function (req, res) {
        if (req.session.userId) {
            res.send({ status: true, userId: req.session.userId })
        } else {
            res.send({ status: false })
        }
    },
    addToWatchlist: function (req, res) {

    },
    getUser: function (req, res) {
        User.findById(req.params.id)
            .sort({ createdAt: -1 })
            .populate('comments')
            .exec(function (err, user) {
                if (err) {
                    res.send(err)
                } else {
                    res.send(user)
                }
            })
    },
    submitReview: function (req, res) {
        User.findById(req.params.id, function (err, user) {
            console.log(user)
            if (err) {
                res.send(err);
            } else {
                let newReview = new Review({
                    movieId: req.body.movieId,
                    title: req.body.title,
                    text: req.body.text,
                    rating: req.body.rating
                })
                newReview._user = user;
                console.log(newReview);
                newReview.save(function (err) {
                    if (err) {
                        console.log("line 97")
                        res.send(newReview.errors);
                    } else {
                        res.send(user);
                    }
                })
            }
        })
    }
}