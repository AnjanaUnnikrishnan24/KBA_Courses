import {Schema} from "mongoose";
import {model}  from "mongoose";

const coursedb = new Schema({
    cname : {type:String,required:true,unique:true},
    cId: {type:String,required:true},
    ctype: {type:String,required:true},
    cdescription: {type:String,required:true},
    cprice: {type:Number,required:true},
    Image: {type:String}
});

const sample = model('addcourse',coursedb)
export {sample}
