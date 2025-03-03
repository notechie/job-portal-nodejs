import userModel from "../models/userModel.js";

export const registerController = async (req, res, next) => {

    const { name, lastName, email, password, location } = req.body;

    const user = await userModel.create({ name, lastName, email, password, location });

    const token = user.createJWT();

    res.status(201).json({
        success: true,
        message: 'User created successfully',
        user: {
            _id: user._id,
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            location: user.location
        },
        token
    })
};

export const loginController = async (req, res, next) => {
    const { email, password } = req.body;

    // validate
    if (!email || !password) {
        next('Please provide all fields')
    }

    // find user by email
    const user = await userModel.findOne({ email }).select("+password")
    if (!user) {
        next('Invalid Username or Password')
    }

    // compare password
    const isMatch = user.comparePassword(password)

    if (!isMatch) {
        next('Invalid Username or Password')
    }

    user.password = undefined

    const token = user.createJWT()
    res.status(200).json({
        success: true,
        message: 'Login Successful',
        user,
        token
    })
}