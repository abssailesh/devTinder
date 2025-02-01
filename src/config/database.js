const mongoose = require('mongoose');

const connectDb = async ()=>{
    await mongoose.connectDb(
        "mongodb+srv://abssailesh:Absre%400205@sailesh01.h0zij.mongodb.net/"
    );
};

module.exports = connectDb;

