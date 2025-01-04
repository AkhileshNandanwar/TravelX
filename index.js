const express=require('express');
const mongoose = require('mongoose');
const app=express();

app.get("/",(req,res)=>{
    res.send("Hi ");
})

app.listen(8080,()=>{
    console.log("listening");
    
})

