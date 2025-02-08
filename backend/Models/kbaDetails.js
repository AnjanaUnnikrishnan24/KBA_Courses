import {Schema} from "mongoose";
import {model}  from "mongoose";

const signup = new Schema({
    name:{type:String,required:true}, 
    email:{type:String,required:true,unique:true},
    userRole:{type:String,required:true},
    password:{type:String,required:true}
});

const kbaDetails = model ('userdetails',signup);
export {kbaDetails}
