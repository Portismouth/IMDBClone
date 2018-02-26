var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require("bcrypt-as-promised");
var uniqueValidator = require("mongoose-unique-validator");

var userSchema = new Schema({
    //name
    name: {
        type: String,
        required: [true, "Please enter a name!"],
        minlength: [2, "Please enter an actual name."]
    },
    //email - also user name
    email: {
        type: String,
        required: [true, "Email address is required."],
        unique: [true, "This user already exists!"],
        validate: {
            validator: function (value) {
                return /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/.test(value);
            },
            message: "Please enter a valid email address."
        }
    },
    //password
    password: {
        type: String,
        required: [true, "Enter a password!"],
        minlength: [8, "Password must be at least 8 characters."],
        maxlength: 32,
    },
    //description
    desc: {
        type: String
    },
    ratings: {
        //movie id
        //rating: number
    },



    //reviews - []
    //ratings - []
    //watchlist - [] 
    //picture?
}, { timestamps: true });