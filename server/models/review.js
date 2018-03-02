var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var reviewSchema = new Schema({
    _user: { type: Schema.Types.ObjectId, ref: "User" },
    movieId: {
        type: Number
    },
    movieTitle: {
        type: String
    },
    reviewTitle: {
        type: String,
        required: [true, "Reviews must have a title."],
        minlength: [2, "The title must make sense."]
    },
    text: {
        type: String,
        required: [true, "We need a review..."],
        minlength: [30, "Your review is too short! Please make it at least 30 characters."]
    },
    rating: {
        type: Number
    },
    helpful: {
        type: Number
    },
    notHelpful: {
        type: Number
    }
}, { timestamps: true });

mongoose.model("Review", reviewSchema);