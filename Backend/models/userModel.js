const mongoose = require("mongoose");
const validator = require('validator');
// const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const secretkey = "rejrie4854urj4943ji3j8u48ijije";

const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: 'Invalid email address',
        },
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    cpassword: {
        type: String,
        required: true,
        minlength: 6,
    },
    tokens: [
        {
            token: {
                type: String,
                required: true,
            },
        },
    ],
});



// token generate
userSchema.methods.generateAuthtoken = async function () {
    try {
        let token = jwt.sign({ _id: this._id }, secretkey, {
            expiresIn: "1d"
        });

        this.tokens = this.tokens.concat({ token: token });
        await this.save();
        return token;
    } catch (error) {
        console.error(error);
        throw new Error("Error generating authentication token");
    }
};

module.exports = mongoose.model('Authentication_users', userSchema);
