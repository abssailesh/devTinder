const express = require('express');

const authRouter = express.Router();   
const User = require('../models/user');
const {validateSignUpData} = require('../utils/validation');
const bcrypt = require('bcrypt');



authRouter.post("/signup",async (req,res)=>{
    console.log(req.body);
    try{
        // validation of the data
        validateSignUpData(req);
        const {firstName, lastName,emailId,gender,password} = req.body;

        // encrypting the password

        const passwordHash = await bcrypt.hash(password,10);
        console.log(passwordHash);
        



        // Creating a new instance of the user model
        // const user = new User(req.body);
        const user = new User({
            firstName,
            lastName,
            emailId,
            password:passwordHash,
            gender
        });

        await user.save();
        res.send('user added successfully');
    }catch(err){
        return res.status(400).send("ERROR:" + err.message);
    }
    // using dummy data first
    // const userObj = {
    //     firstName:"sailesh",
    //     lastName:"Kumar",
    //     emailId:"sailesh@gmail.com",
    //     password:"sailesh@123",
    //     gender:"male",
    // }
    // Creating a new instance of the user model.
    // const user = new User(userObj);
        // const user = new User(req.body);

    // const user = new User(
    //     {
    //         firstName:"sailesh",
    //         lastName:"Kumar",
    //         email:"sailesh@gmail.com",
    //         password:"123456"
    //     }
    // );
    // try{
    //     await user.save();
    //     res.send('user added successfully')
    // }catch(err){
    //     res.status(500).send("ERROR: " + err.message);
    // }
});

authRouter.post("/login",async (req,res)=>{
    try{
        const {emailId, password} = req.body;
        const user = await User.findOne({emailId: emailId});
        if(!user){
            throw new Error("Invalid Credentials");
        }
        // const isPasswordValid = await bcrypt.compare(password, user.password);
        const isPasswordValid = await user.validatePassword(password);
    
        if(isPasswordValid){
            // Create a JWT token
            // const token = jwt.sign({_id:user._id},"Dev@Tinder$790",{expiresIn:"7d"});
            const token = await user.getJWT();
            // console.log(token);

            // Add the token to cookie and send the response back to the user.
            res.cookie("token", token,{expires: new Date(Date.now() + 8 * 3600000)});
            res.send("Login Successful");
        }else{
            throw new Error("Invalid Credentials");
        }
    }catch(err){
        res.status(400).send("ERROR:"+ err.message);

    }
    
});

authRouter.post('/logout',async (req,res) => {
    res.cookie("token",null,{expires: new Date(Date.now())});
    res.send("Logged Out Successfully");
});



module.exports = authRouter;