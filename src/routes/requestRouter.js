const express = require('express');
const requestRouter = express.Router();
const {userAuth} = require('../middlewares/auth');
const connectionRequest = require('../models/connectionRequest');
const User = require('../models/user');
requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {

    const fromUserId = req.user._id;
    const status = req.params.status;
    const toUserId = req.params.toUserId;

    const allowedStatus = ["ignored", "interested"];
    if(!allowedStatus.includes(status)){
        return res.status(400).json({message : "Invalid status type :" + status});
    }
    const toUser = await User.findById(toUserId);
    if(!toUser){
        return res.status(404).json({message : "User not found"});
    }
    const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
            {fromUserId: toUserId},
            {fromUserId: toUserId, toUserId: fromUserId}
        ]
    });
    if(existingConnectionRequest){
        return res.status(400).json({message : "Connection request already exists"});
    }

    const ConnectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status
    });

    const data = connectionRequest.save();
    
})

module.exports = requestRouter;