import {Schema, model} from 'mongoose';

const UserSchema=new Schema({
    firstName:{ type:String,required:true },
    lastName:{ type:String,required:true },
    userName:{ type:String,required:true,unique:true },
    password:{ type:String,required:true },
    userRole:{ type:String ,enum:['admin','user'],required:true }
});

const User=model('Users',UserSchema)

const CourseSchema=new Schema({
    courseName:{ type:String, required : true, unique:true },
    courseId:{ type:String, required : true },
    courseType:{ type:String, required : true },
    description:{ type:String, required : true },
    price:{ type:Number, required : true },
    image:{ type:String, required : true }

});

const Course=model('courses',CourseSchema) 

export { User, Course };