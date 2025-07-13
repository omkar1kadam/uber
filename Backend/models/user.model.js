const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    fullName: {
        firstname: {
            type: String,
            required: true,
            minlength: [3,'First name must be at least 3 characters long'],
        },
        lastname: {
            type: String,
            minlength: [3,'Last name must be at least 3 characters long'],
        }    
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
        minlength: [5, 'Email must be at least 5 characters long'],
    },    
    password: {
        type: String,
        required: true,
        select: false,
    },
    socketId: {
        type: String,
    },
})

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
    return token;
}

userSchema.methods.comparePassword = async function(Password) {
    return await bcrypt.compare(Password, this.password);
}

userSchema.statics.hashPassword = async function(Password) {
    return await bcrypt.hash(Password, 10);
}

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;