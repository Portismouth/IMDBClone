var mongoose = require("mongoose");
var User = mongoose.model("User");
var Review = mongoose.model("Review");

module.exports = {
    getUserReviews: function (req, res) {
        Review.findById(req.params.id, function (err, review) {
            if (err) {
                res.send(err);
            } else {
                res.send(review);
            }
        });
    },
    getMovieReviews: function (req, res) {
        console.log(req.params.movieId);
        Review.find({movieId: req.params.movieId}, function (err, reviews) {
            if (err) {
                res.send(err);
            } else {
                res.send(reviews);
            }
        });
    }
}