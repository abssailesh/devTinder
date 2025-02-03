const express = require('express');
const profileRouter = express.Router();
const {userAuth} = require('../middlewares/auth');

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





module.exports = profileRouter;