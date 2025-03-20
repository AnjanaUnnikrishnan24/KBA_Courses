import express,{json} from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import userauth  from './Routes/userAuth.js';
import adminauth from './Routes/adminAuth.js';
import morgan from 'morgan';

dotenv.config();

const app=express(); 
app.use(morgan('dev'))

app.use(cors({
    origin:'*',
    credentials:true
}))

app.use(json());

app.use('/',userauth);
app.use('/',adminauth);

 
app.get('/',function(req,res){
    //console.log("hi")
    res.send("Hello Everyone ");

});

app.post('/',function(req,res){
    res.send("Hello Everyone");
})

mongoose.connect('mongodb://mongodb:27017/KBA_DB').then(()=>{
    console.log("Mongodb connected Successfully to KBA Course");})
    .catch((error)=>{
        console.error("Mongodb connection failed",error);
});

app.listen(process.env.PORT,function(){
    console.log(`server is listening at ${process.env.PORT}`);
});



