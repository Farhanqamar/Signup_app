const express = require('express');
const userModel = require('../models/userModel');
const bcrypt = require("bcryptjs");
const authorization = require("../middleware/authenticate")

const router = express.Router();

router.get('/register', (req, res) => {
    res.send(`register running`);
});

router.post('/register', async (req, res) => {
    const { fname, email, password, cpassword } = req.body;

    if (!fname || !email || !password || !cpassword) {
        return res.status(400).json({ error: `Fill all the details` });
    }

    try {
        const preuser = await userModel.findOne({ email: email });

        if (preuser) {
            return res.status(400).json({ error: `This Email is Already Exist` });
        } else if (password !== cpassword) {
            return res.status(400).json({ error: `Password and Confirm Password Not Match` });
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const hashedcPassword = await bcrypt.hash(cpassword, 10);

            const finalUser = new userModel({
                fname, email, password: hashedPassword, cpassword: hashedcPassword
            });

            const saveUserData = await finalUser.save();
            return res.status(201).json({
                status: 201,
                saveUserData
            });
        }
    } catch (error) {
        console.error('Register error:', error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(401).json({ error: `Fill all details` });
    }

    try {
        const userValid = await userModel.findOne({ email: email });

        if (userValid) {
            if (!password || !userValid.password) {
                return res.status(401).json({ error: `Invalid details` });
            }

            const passMatched = await bcrypt.compare(password, userValid.password);

            if (!passMatched) {
                return res.status(401).json({ error: `Invalid details` });
            } else {
                const token = await userValid.generateAuthtoken();
                // console.log('Generated Token:', token);

                // Genrate cookies
                res.cookie("usercookie", token, {
                   expires: new Date(Date.now()+9000000),
                   httpOnly:true
                })

                const result = {
                    userValid,
                    token
                }

                res.status(201).json({status:201, result})
            }
        }
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});
// user vaild
router.get('/validuser',authorization, async (req,res)=>{

    try {
        const ValiduserOne = await userModel.findOne({_id:req.userId});
    res.status(201).json({status:201, ValiduserOne});
    } catch (error) {
    res.status(401).json({status: 401, error});
    }
});

router.get('/logout', authorization, async (req, res) => {
    try {
        
        if (req.rootuser && req.rootuser.tokens) {
            // Remove the token from the tokens array
            req.rootuser.tokens = req.rootuser.tokens.filter((curelem) => {
                return curelem.token !== req.token;
            });
        } else {
            // Handle the case where req.rootuser or req.rootuser.tokens is undefined
            throw new Error('User or user tokens not found');
        }

        // Clear the cookie
        res.clearCookie("usercookie");  // Make sure the cookie name matches the one set

        // Save the updated user with the removed token
        await req.rootuser.save();

        res.status(201).json({ status: 201 });
    } catch (error) {
        console.log(error)
        res.status(401).json({ status: 401, error: `faced this err: ${error.message}` });
    }
});

module.exports = router;