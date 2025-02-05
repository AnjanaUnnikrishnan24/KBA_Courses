import {Schema} from "mongoose";
import {model}  from "mongoose";

const signup = new Schema({
    name:{type:String,required:true}, 
    email:{type:String,required:true,unique:true},
    userRole:{type:String,required:true},
    password:{type:String,required:true}
});

const coursedb = new Schema({
    cname : {type:String,required:true,unique:true},
    cId:{type:String,required:true},
    ctype:{type:String,required:true},
    cdescription:{type:String,required:true},
    cprice:{type:Number,required:true}
});

const user = model ('userdetails',signup);
const course = model('CourseDetails',coursedb)
export {user , course};