const express = require('express');
const profileRouter = express.Router();
const {userAuth} = require('../middlewares/auth');
const { validateEditProfileData } = require('../utils/validation');
const bcrypt = require('bcrypt');

profileRouter.get('/profile', userAuth, async (req, res)=>{
    try{
        // const cookies = req.cookies;
    
        // const {token} = cookies;
        // if(!token){
        //     throw new Error("Invalid Token");
        // }
    
    
        // Validate my token
    
        // const decodedMessage = await jwt.verify(token,"Dev@Tinder$790");
        // console.log(decodedMessage);
        // const{_id} = decodedMessage;
        // console.log("logged in user is :" + _id); 
        // const user = await User.findById(_id);
        const user = req.user;
        // if(!user){
        //     throw new Error("User not found");
        // }
    
        // console.log(cookies);
        // res.send("Sending Cookies");
        res.send(user);

    }catch(e){
        res.status(400).send("ERROR: " + e.message);
    }
});

profileRouter.patch('/profile/edit', userAuth, async (req, res) => {
    try{
        if(!validateEditProfileData){
            throw new Error("Invalid Edit request");
        }
        const loggedInUser = req.user;
        // console.log(loggedInUser);
        Object.keys(req.body).forEach((key) => {loggedInUser[key] = req.body[key]});
        // console.log(loggedInUser);
        await loggedInUser.save();

        // res.send("Profile updated");

        // const updatedUser = await User.findById(loggedInUser._id);
        // console.log(updatedUser);

        // res.send(updatedUser);

        // res.send(loggedInUser);
        // res.send(`${loggedInUser.firstName}, your profile has been updated`)
        res.json({message : `${loggedInUser.firstName},your profile has been updated`,
            data : loggedInUser,
    });
    }catch(e){
        res.status(400).send("ERROR: " + e.message);
    }
})
profileRouter.patch('/profile/password', userAuth, async (req, res) => {
    // console.log(req.body)
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const loggedInUser = req.user;
        // console.log(loggedInUser)
        loggedInUser.password = hashedPassword;
        await loggedInUser.save();
        res.json({message : "Password updated successfully",
            data : loggedInUser,
    });
    }catch(e){
        res.status(400).send("ERROR: " + e.message);
    }
})
module.exports = profileRouter;