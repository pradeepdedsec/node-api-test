const express = require("express");

const app = express();

const dotenv=require('dotenv').config();

const cors=require('cors');

const bodyParser=require("body-parser");


app.get("/home",(req,res) =>{
    res.send("hello world");
});


app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.listen(3000,()=>{
    console.log("server is running on port 3000");
});