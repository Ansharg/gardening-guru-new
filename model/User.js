const mongoose = require('mongoose');;

const userSchema = mongoose.Schema({
    UserName: {type: String,unique: true, required: true},
    UserEmail: {type: String, unique:true, required: true},
    Password: {type:String, required: true},
    is_verify: {type: Boolean, default: false},
    Admin: {type: Boolean, default: false},
    garden: []
});

module.exports = mongoose.model("User",userSchema);