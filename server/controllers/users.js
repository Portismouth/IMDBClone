var mongoose = require("mongoose");
var bcrypt = require("bcrypt-as-promised");
var User = mongoose.model("User");
var session = require('express-session');

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
                    res.send({ user: newUser, message: "success" })
                }
            })
        }
    },
    login: function (req, res) {
        User.findOne({ email: req.body.email }, function (err, user) {
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
                        res.send({ message: "Email is not in our database" })
                    });
            }
        });
    }
}