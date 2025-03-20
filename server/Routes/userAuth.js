import { Router } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User } from "../Models/sample.js";
import authenticate from "../Middleware/auth.js";

dotenv.config();

const userauth=Router();

userauth.post('/signup',async(req,res)=>{
    try{
        const {FirstName,LastName,UserName,Password,UserRole} = req.body;
        console.log(FirstName);
    
        const existingUser=await User.findOne({userName:UserName})
        console.log(existingUser);
    

        if(existingUser){
            res.status(400).send("Username already exist") ;
        }
        else{
            const newPassword =await bcrypt.hash(Password,10);
            console.log(newPassword);
            const newUser = new User({
                firstName: FirstName,
                lastName: LastName,
                userName: UserName,
                password: newPassword,
                userRole: UserRole
            });
            await newUser.save();
            res.status(201).send("Signed-up successfully")
        }}
    catch{
        res.status(500).send("Internal Server error");
    } 
})

userauth.post('/login',async(req,res)=>{
    try{
        const {UserName,Password}=req.body;
        const result = await User.findOne({userName:UserName})
console.log(result);

        if(!result){
            res.status(400).send("Enter a valid username");
        }
        else{
            console.log(result.password);
            const valid = await bcrypt.compare(Password,result.password);
            console.log(valid);
            if(valid){
                const token = jwt.sign({UserName:UserName,UserRole:result.userRole},process.env.SECRET_KEY,{expiresIn:'1h'});
                console.log(token);
                res.cookie('authToken',token,
                {
                    httpOnly:true
                });
                res.status(200).json({message:"Logged in successfully"});
            }
            else{

                res.status(401).json({msg:"Unauthorized access"});

            }
         }
    }
    catch{
        res.status(500).send({msg:"Internal Server Error"})
    }
})

userauth.get('/logout',(req,res)=>{
    res.clearCookie('authToken');
    res.status(200).json({msg:"Successfully logged out"})
})

userauth.get('/profile',authenticate,async(req,res)=>{
    res.json({ UserName:req.user, userRole:req.role })
})

export default userauth;
