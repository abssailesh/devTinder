const validator = require('validator');
const validateSignUpData = (req)=>{
    const {firstName,lastName,emailId,password} = req.body;
    if(!firstName || !lastName){
        throw new Error("Name is required");
    } else if(!validator.isEmail(emailId)) {
        throw new Error("Please enter a valid email");
    } else if(!validator.isStrongPassword(password)) {
        throw new Error("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number");
    }
};

module.exports = {
    validateSignUpData
};