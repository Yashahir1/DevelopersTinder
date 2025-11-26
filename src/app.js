const express = require('express');
const app = express();

app.get("/",(req,res)=>{
    res.send("This is the dashboard page.");
})

app.get("/test",(req,res)=>{
    res.send("Yes, this is the test page u have reached.")
})

app.get("/about",(req,res)=>{
    res.send("We are developing the devtinder for the developer.")
})

app.listen(4488, () => console.log('Server running on port 4488'));