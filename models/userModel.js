import mongoose from "mongoose";
import validator from 'validator';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true],
        validate: {
            validator: validator.isEmail,
            message: "Please provide a valid Email"
        }
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password length should be more than 6 characters"],
        select: true
    },
    location: {
        type: String,
        default: 'India'
    }
}, {
    timestamps: true
});

// Middlewares
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Compare password
userSchema.methods.comparePassword = async function (userPassword) {
    const isMatch = await bcrypt.compare(userPassword, this.password)
    return isMatch
}

// JSON web token
userSchema.methods.createJWT = function () {
    return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, { expiresIn: '10m' });
}

export default mongoose.model('User', userSchema)