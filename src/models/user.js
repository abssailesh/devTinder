const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({

    firstName:{
        type:String,    
        required : true
    },
    lastName: {
        type: String,
    },
    emailId: {
        type:String,
        required : true,
        unique: true,
        trim : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Please enter a valid email')
            }
        }
    },
    age:{
        type: Number,
    },
    password: {
        type:String,
        required : true,
        minLength: 4,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error('Please enter a strong email')
            }
        }
    },
    gender:{
        type: String,
        validate(value){
            if(!["male", 'female','others'].includes(value)){
                throw new Error("Gender should be either male, female or others");
            }
        }
    },
    photourl:{
        type : String,
    },
    about:{
        type: String,
        default: "Know about me"
    },
    skills:{
        type: [String],
    },

},
{
    timestamps: true,
 
});

userSchema.methods.getJWT = async function () {
    const user = this;

    const token = await jwt.sign({_id: user._id},'Dev@Tinder$790',{expiresIn : "7d"});

    return token;
};

userSchema.methods.validatePassword = async function(passwordInputByUser) {
    const user = this;
    const passwordHash = user.password;

    const isPasswordValid  = await bcrypt.compare(passwordInputByUser, passwordHash);

    return isPasswordValid;
}


// const User = mongoose.model('User',userSchema);
// module.exports = User;

module.exports = mongoose.model('User',userSchema);