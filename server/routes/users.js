//THIRD PARTY MODULES
const express = require('express');
const router = express.Router();
const {
    isEmail
} = require('validator');
//BUILT IN MODULES

//CUSTOM MODULE FILES
const {
    User
} = require('./../model/User');
const { authenticate } = require('./../middleware/authenticate');
const { Recipie } = require('./../model/Recipie');

//ROUTES

//POST - /users - Create New User
router.post('/', async (req, res) => {
    const fullName = req.body.fullName;
    const email = req.body.email;
    const password = req.body.password;


    if (!email) {
        return res.status(400).json({
            error: "Email is Required"
        });
    } else if (!isEmail(email)) {
        return res.status(400).json({
            error: "Please Provide Valid Email"
        });
    } else if (!password || password.length < 6) {
        return res.status(400).json({
            error: "Password Must Be greater than 6"
        });
    } else if (!fullName) {
        return res.status(400).json({
            error: "Full Name is Required"
        });
    }

    try {

        const foundUser = await User.findOne({
            email: req.body.email
        });
        if (foundUser) {
            return res.status(400).json({
                error: "User is Already Registered"
            });
        } else {

            let user = new User({
                fullName: req.body.fullName,
                email: req.body.email,
                password: req.body.password
            });

            const newUser = await user.save();
            if (newUser) {
                const token = await newUser.generateAuthToken();
                res.header('x-auth', token).json({
                    user: newUser
                });
            }
        }
    } catch (e) {
        console.log('POST /users', e);
    }
});

//Post - /users/login - Login A User
router.post('/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    if (!email) {
        return res.status(400).json({ error: "Please Provide Email" });
    } else if (!isEmail(email)) {
        return res.status(400).json({ error: "Please Provide Valid Email" });
    } else if (!password) {
        return res.status(400).json({ error: "Please Enter Password" });
    }

    try {
        const foundUser = await User.findByCredentials(email, password);
        if (foundUser) {
            const token = await foundUser.generateAuthToken();
            res.header('x-auth', token).json({ user: foundUser });
        }
    } catch(e) {
        res.status(400).json({ error: e.message });
    }
    
 });

 //DELETE - /users/logout - LOGOUT THE USER
 router.delete('/logout', authenticate, async (req, res) => {
     try {
        await req.user.removeToken(req.token);
        res.json({ msg: "Logged Out" });
     } catch(e) {
        res.status(400).json({ error: e.message });
     }
 })

 //DELETE - /users/danger - DELETE THE USER & HIS/HER RECIPIES
 router.delete('/danger', authenticate, async (req, res) => {
     try {
        const deletedUser = await User.findOneAndRemove({ _id: req.user._id });
        if (deletedUser) {
            await Recipie.deleteMany({ _creator: deletedUser._id });
            res.json({msg: `${deletedUser.fullName} is Deleted.` });
        } else {
            throw new Error('No User Found');
        }
     } catch(e) {
        res.status(404).json({ error: e.message });
     }
 });


// EXPORTING ROUTER
module.exports = router;