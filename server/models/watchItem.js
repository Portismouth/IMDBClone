var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var watchSchema = new Schema({
    movieId: { type: Number },
    _user: { type: Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });

mongoose.model("Watch", watchSchema);