const asyncHandler = require('express-async-handler')
const User = require('../Models/userModel');
const generateToken = require('../config/generateToken');


const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        res.status(400).send({ message: "Please fill all fields" });
    }

    const isUserExist = await User.findOne({ email });

    if (isUserExist) {
        res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
        name,
        email,
        password
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
            message: "Registration Successfull"
        });

    } else {
        res.status(400).json({ message: "Failed to create user" });
    }

})


const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword)) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
            message: "Login Successfull"
        })
    } else {
        res.status(400).send({ message: "Invalid email or password" });
    }


})


const allUsers = asyncHandler(async(req, res) => {
    const keyword = req.query.search ? {
        $or : [
            { name : { $regex : req.query.search, $options : "i"}},
            { email : { $regex : req.query.search, $options : "i"}},
        ],
    } : {};

    const users = await User.find(keyword).find({_id : {$ne : req.user._id}});
    res.send(users);

})

module.exports = { registerUser, authUser, allUsers }