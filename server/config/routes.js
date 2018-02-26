var mongoose = require('mongoose');
var User = mongoose.model("User");
//require necessary controllers
var users = require("../controllers/users.js");

module.exports = function (app) {
    //user routes
    app.route('/register')
        .post(users.register)
    app.route('/login')
        .post(users.login)
        
}