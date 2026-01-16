const mongo = require("mongoose");
const { Schema } = mongo;

const usersSchema = new Schema({
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
        default: false
    }
}, { timestamps: true });   

module.exports = mongo.model('user', usersSchema);