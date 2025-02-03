const express = require('express');
const requestRouter = express.Router();
const {userAuth} = require('../middlewares/auth');
requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {

    const user = req.user;
    // sending a connection request
    // console.log("Sending a connection request");

    res.send(user.firstName  + " : Sent a connection request")
})

module.exports = requestRouter;