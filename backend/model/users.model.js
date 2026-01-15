const mongo = require("mongoose");
const {Schema} = mongo;

const userSchema = new Schema({
    fullname: String,
    mobile: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    profile: String,
    address: String,
    userType: String,
    isActive: {
        type: Boolean,
        default: true
    }
},{timestamps: true});

module.exports = mongo.model("user", userSchema);