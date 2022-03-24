const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    name:{
        type: String,
        require:true,
        MinLength:6,
        MaxLength:255,
    },
    email:{
        type: String,
        require:true,
        min:6,
        max:255,
        unique:true,
        lowercase:true,
    },
    password:{
        type: String,
        require:true,
        MinLength:6,
        MaxLength:1024,
    },
    isAdmin:{
        type: Boolean,
        default:false,
    }
},{
    timestamps:true,
});

module.exports = mongoose.model('User',User)