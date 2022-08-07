//jshint esversion:6
//require ("dotenv").config();
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import bodyParser from "body-parser";
import ejs from "ejs";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "./models/userModel.js";


const saltRounds = 10;


const app = express();


app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect("mongodb://localhost:27017/userDB",{useNewUrlParser:true})

app.get("/", (req,res)=>{
   res.render("home");
});

app.get("/login", (req,res)=>{
   res.render("login");
});
app.get("/register", (req,res)=>{
   res.render("register");
});

app.post("/register", (req,res)=>{

   bcrypt.hash(req.body.password, saltRounds, (err, hash)=> {
       const newUser = new User({
           email: req.body.username,
           password: hash
       });
   
       newUser.save((err)=>{
           if(err){
               console.log(err);
           }else{
               res.render("secrets");
           }
       });
   });
   
   
});

app.post("/login",(req,res)=>{
   const username = req.body.username;
   const password = req.body.password;

   User.findOne({email: username},(err,foundUser)=>{
       if(err){
           console.log(err);
       }else{
           if(foundUser){
               bcrypt.compare(password, foundUser.password,(err, result)=> {
                   if(result === true) {
                       res.render("secrets");

                   }
               });
               
           }
       }
   });
});


app.listen(3000, ()=>{
   console.log("Server started on port 3000.");
});