var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var watchSchema = new Schema({
    movieId: { type: Number }
}, { timestamps: true });

mongoose.model("Watch", watchSchema);