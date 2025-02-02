const mongoose = require('mongoose');
const validator = require('validator');

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


// const User = mongoose.model('User',userSchema);
// module.exports = User;

module.exports = mongoose.model('User',userSchema);