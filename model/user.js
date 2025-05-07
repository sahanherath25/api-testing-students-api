const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, "User Name Must be Required"],
        unique: true,
        requiredExtensions:[true,"Name is Required"]
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: [true, "Email is missing"]
    },
    password: {
        type: String,
        required: [true, "Password is Required"]
    },
    passwordConfirm: {
        type: String,
        required: [true, "Password is Required"],
        validate: {
            validator: function (document) {
                return document === this.password
            },
            message: "Password is not matching"
        }
    },
    date: {
        type: Date,
        default: Date.now
    }

})


const User = mongoose.model("User", UserSchema)

module.exports = User;