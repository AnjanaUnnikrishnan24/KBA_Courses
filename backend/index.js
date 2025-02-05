import express,{json} from 'express';
import dotenv from 'dotenv';
import { userAuth } from './Routes/userAuth.js';
import adminAuth from './Routes/adminAuth.js';
import mongoose from 'mongoose';
import cors from 'cors';

dotenv.config();

const app=express();

app.use(cors({
    origin:'*',
    credentials:true
}))

app.use(json());

app.use('/',userAuth);
app.use('/',adminAuth);

//app.use('/admin',adminSign);

app.get('/',function(req,res){
    //console.log("hi")
    res.send("Hello Everyone ");

});

app.post('/',function(req,res){
    res.send("Hello Everyone");
})

mongoose.connect('mongodb://localhost:27017/KBACOURSES').then(()=>{
    console.log("Mongodb connected Successfully to KBA Course");})
    .catch((error)=>{
        console.error("Mongodb connection failed",error);
});

app.listen(process.env.PORT,function(){
    console.log(`server is listening at ${process.env.PORT}`);
});



