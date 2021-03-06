var mongoose = require('mongoose');
var User = mongoose.model("User");
//require necessary controllers
var users = require("../controllers/users.js");
var reviews = require("../controllers/reviews.js");

module.exports = function (app) {
    //auth routes
    app.route('/register')
        .post(users.register)
    app.route('/login')
        .post(users.login)
    app.route('/session')
        .get(users.checkSession)
    app.route('/logout')
        .get(users.logout)

    //user routes
    app.route('/user/:id')
        .get(users.getUser)
        .post(users.submitReview)
        .put()
        .delete()

    //review routes
    app.route('/review/:id')
        .get(reviews.getUserReviews)
        .put()
        .delete()

    app.route('/reviews/:movieId')
        .get(reviews.getMovieReviews)
            
    //watchlist routes
    app.route('/watchlist/:userId')
        .post(users.addToWatchlist)
    
}