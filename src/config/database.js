const mongoose = require('mongoose');

const connectDB = async ()=>{
    await mongoose.connect(
        "mongodb+srv://abssailesh:Absre%400205@sailesh01.h0zij.mongodb.net/DevTinder"
    );
};

module.exports = connectDB;

