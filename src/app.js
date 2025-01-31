// console.log("Starting a new Project");


const express = require('express');
// creating a new application of express js

const app = express();

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

app.use('/users',(req,res,next)=>{
    console.log("Handling the route user 1");
    // res.send("Response 1");
    next();
},(req,res,next)=>{
    console.log("Handling the route user 2");
    // res.send("Response 2");
    next();
},(req,res,next)=>{
    console.log("Handling the route user 3");
    // res.send("Response 3");
    next();
},(req,res,next)=>{
    console.log("Handling the route user 4");
    // res.send("Response 4");
    next();
}
,(req,res)=>{
    console.log("Handling the route user 5");
    res.send("Response 5");
});


app.listen(3000,()=>{
    console.log("Server is listening on port 3000");

}); 
