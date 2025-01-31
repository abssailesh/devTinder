// console.log("Starting a new Project");


const express = require('express');
// creating a new application of express js

const app = express();

//  Request Handler which is basically how the server responds to the incoming request.
// app.use((request, response)=>{
//     response.send("Hello World from the server");
// })

app.use("/hello/2",(req,res)=>{
    res.send("Abracdabraaaaaa");
});
app.use("/test",(req,res)=>{
    res.send("Hello World from the test server");
});
app.use("/hello",(req,res)=>{
    res.send("Hello World from the hello server");
});
// App.listen have a call back function that will only be called when our server is up and running.
app.listen(3000,()=>{
    console.log("Server is listening on port 3000");
    
}); 
app.use("/",(req,res)=>{
    res.send("Hello Sailesh");
});
