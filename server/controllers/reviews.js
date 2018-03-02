var mongoose = require("mongoose");
var User = mongoose.model("User");
var Review = mongoose.model("Review");

module.exports = {
    getReviews: function (req, res){
        console.log("here")
        Review.findById(req.params.id, function (err, review) {
            if(err) {
                res.send(err);
            } else {
                res.send(review);
            }
        });
    }
}