var mongoose = require('mongoose');
var User = mongoose.model("User");
//require necessary controllers
var users = require("../controllers/users.js");

module.exports = function (app) {
    //auth routes
    app.route('/register')
        .post(users.register)
    app.route('/login')
        .post(users.login)
    app.route('/session')
        .get(users.checkSession)

    //user routes
    app.route('/user/:id')
        .get(users.getUser)
        .post(users.submitReview)
        .put()
        .delete()
}