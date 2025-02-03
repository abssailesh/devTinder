// console.log("Starting a new Project");


const express = require('express');
// creating a new application of express js

const app = express();

const connectDB = require('./config/database');

const User = require('./models/user');

const {validateSignUpData} = require('./utils/validation');

const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const {userAuth} = require('./middlewares/auth');

app.use(express.json());
app.use(cookieParser());

//  Request Handler which is basically how the server responds to the incoming request.
// app.use((request, response)=>{
//     response.send("Hello World from the server");
// })

// app.get("/users",(req,res)=>{
//     res.send({"firstName" : "Sailesh"});
// });
// app.post("/users",(req,res)=>{
//     console.log("Data is Saved to the POST");
//     res.send("The data is saved in the post call to the database...");
// });
// app.delete("/users",(req,res)=>{
//     res.send("Deleted Successfully");
// });
// app.use("/test",(req,res)=>{
//     res.send("Hello World from the test server");
// });
// App.listen have a call back function that will only be called when our server is up and running.

// works for //abc and //ac
// app.get("/ab?c",(req,res)=>{
//     res.send({"firstName" : "Sailesh"});
// });

//  works for //abc and //abbbbbbbbbbbbbbbc and etcc....  but the pattern must be followed
// app.get("/ab+c",(req,res)=>{
//     res.send({"firstName" : "Sailesh"});
// });

// *  means anything
// app.get("/ab*cd",(req,res)=>{
//     res.send({"firstName" : "Sailesh"});
// });

// bc is optional , grouping can also be done.
// app.get("/a(bc)?d",(req,res)=>{
//     res.send({"firstName" : "Sailesh"});
// });

// app.get(/sailesh/,(req,res)=>{
//     res.send("Thaggedhey Le");
// });

// app.get("/users/:userID/:name/:password",(req,res)=>{
//     console.log(req.params);
//     res.send({"firstName" : "Sailesh"});
// });
// app.get("/users",(req,res)=>{
//     console.log(req.query);
//     res.send({"firstName" : "Sailesh"});
// });

// app.use('/users',(req,res,next)=>{
//     console.log("Handling the route user 1");
//     // res.send("Response 1");
//     next();
// },(req,res,next)=>{
//     console.log("Handling the route user 2");
//     // res.send("Response 2");
//     next();
// },(req,res,next)=>{
//     console.log("Handling the route user 3");
//     // res.send("Response 3");
//     next();
// },(req,res,next)=>{
//     console.log("Handling the route user 4");
//     // res.send("Response 4");
//     next();
// }
// ,(req,res)=>{
//     console.log("Handling the route user 5");
//     res.send("Response 5");
// });

// const { adminAuth , userAuth } = require("./middlewares/auth")

// app.use("/admin",adminAuth);
// // app.use("/user", userAuth,(req,res)=>{
// //     res.send("User Data sent!");
// // });

// app.post("/user/login",(req,res)=>{
//     res.send("User Logged in Successfully!");
// })
// app.get('/admin/getAllData', (req,res)=>{
//     res.send("Sent All Data!");
// });
// app.get("/admin/deleteUser", (req,res)=>{
//     res.send("Deleted User!");
// });

// app.get("/userData",(req,res,next)=>{
//     try{
//         throw new Error("dbfhsjfjdfs");
//         res.send("User Data sent!");
        
//     }catch(e){
//         // res.status(500).send('Contact The Support Team');
//         next(e);
//     };
// });
// app.use("/",(err,req,res,next)=>{
//     if(err){
//         res.status(500).send("Something went wrong")
//     }
// }); 


// Login API

app.post("/login",async (req,res)=>{
    try{
        const {emailId, password} = req.body;
        const user = await User.findOne({emailId: emailId});
        if(!user){
            throw new Error("Invalid Credentials");
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
    
        if(isPasswordValid){
            // Create a JWT token
            const token = jwt.sign({_id:user._id},"Dev@Tinder$790",{expiresIn:"7d"});
            // console.log(token);

            // Add the token to cookie and send the response back to the user.
            res.cookie("token", token);

            
            res.send("Login Successful");
        }else{
            throw new Error("Invalid Credentials");
        }
    }catch(err){
        res.status(400).send("ERROR:"+ err.message);

    }
    
});


app.get('/profile', userAuth, async (req, res)=>{
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


//  Finding data with the help of email.
// app.get("/user",async (req,res)=>{
//     const userEmail = req.body.emailId;

//     try{
//         const users = await User.find({emailId: userEmail});

//         if(users.length === 0){
//             return res.status(404).send("User not found");
//         }else{
            
//             res.send(users);
//         }

//     }catch(e){
//         res.status(400).send("Something went wrong");
//     }
// });


// feed API
// app.get('/feed',async (req,res)=>{
//     try{
//         const allUsers = await User.find({});
//         res.send(allUsers);
//     }catch(err){
//         res.status(400).send("Something went wrong")
//     }
// });

// app.delete("/user",async (req, res)=>{

//     const userId = req.body.userId;
//     try{
//         const user = await User.findByIdAndDelete(userId);
//         res.send("User deleted");
//     }catch(err){
//         res.status(400).send("Something went wrong");
//     }
// });



app.post("/signup",async (req,res)=>{
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
// app.patch('/user/:userId',async (req, res) => {
// // app.patch('/user',async (req, res) => {
//     // const userId = req.body.userId;
//     const userId = req.params?.userId;
//     console.log(userId);
//     console.log(req.body);
//     const data = req.body;
//     console.log(data);
    
//     try{
//         const allowedUpdates = ["about","gender","age","skills"];
//         const isUpdateAllowed = Object.keys(data).every((k)=>allowedUpdates.includes(k));
//         if(!isUpdateAllowed){
//             throw new Error('Updates not allowed')
//         };
//         if(data?.skills.length > 5){
//             throw new Error('Skills should not exceed 5')
//         };
//         if(data?.skills.length > 6){
//             throw new Error('Skills should not exceed 6')
//         }
//         const user = await User.findByIdAndUpdate({_id: userId},data,{runValidators:true});
//         console.log(user),
//         res.send("User updated successfully");
//     }catch(err) {
//         res.status(400).send("Update failed: " + err.message);
//     };
// })

app.post("/sendConnectionRequest", userAuth, async (req, res) => {

    const user = req.user;
    // sending a connection request
    console.log("Sending a connection request");

    res.send(user.firstName  + " : Sent a connection request")
})


connectDB().then(()=>{
    console.log("Connected to database");  
    app.listen(3000,()=>{
        console.log("Server is listening on port 3000");
    }); 
}).catch(err=>{
    console.error("Error connecting to database",err);
 
});






