import {Router} from "express";
import authenticate from "../Middleware/auth.js";
import adminCheck from "../Middleware/adminCheck.js"
import { sample } from "../Models/sample.js";

const adminAuth = Router();
//const course = new Map();

adminAuth.post('/addCourse', authenticate,adminCheck, async (req, res) => {
    try {
        const { CourseName, CourseId, CourseType, Description, Price } = req.body;
        console.log(CourseName);
        const existingCourse = await sample.findOne({cname:CourseName})
        if(existingCourse){
            res.status(401).send("Course Already exist");
        }else{
            const newCourse = new sample({
                cname :CourseName,
                cId:CourseId,
                ctype:CourseType,
                cdescription:Description,
                cprice:Price
            });
            await newCourse.save();
            res.status(201).send("Course added successfully")
        }} 
    catch  {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

adminAuth.get('/getCourse', async (req, res) => {
    try {
        const name = req.query.CourseName;
        console.log(name);

        const result = await sample.findOne({cname:name});
    
        if (result) {
            res.status(200).json({ data:result });
        } else {
            res.status(404).json({ message: "Course not found" });
        }
    } catch {
        res.status(500).json({ message: "Internal Server Error" });
    }
});


adminAuth.put('/updateCourse', authenticate,adminCheck, (req, res) => {
    try {
        const { CourseName, CourseId, CourseType, Description, Price } = req.body;
            
        if(course.get(CourseName)){
            course.set(CourseName, {CourseId, CourseType, Description, Price} );
            res.status(201).send("Course updated successfully")
        }else{
            res.status(404).send("Course doesn't exist")
        } 
    } catch {
        res.status(500).send("Internal Server Error" );
    }
});



adminAuth.patch('/editCourse',authenticate,adminCheck,(req,res)=>{
    try{
        const {CourseName,CourseType,Price}= req.body;
        console.log(CourseType);
        const result = course.get(CourseName);
        console.log(result);

        if(result){
            course.set(CourseName,{CourseId:result.CourseId,CourseType,Description:result.Description,Price});
            res.status(200).send("Course successfully updated");
        }
        else{
            res.status(404).send("Course not found");
        }
    } catch{
        res.status(500).send("Internal Server Error")
    }

})

adminAuth.delete('/deleteCourse',authenticate,adminCheck,(req,res)=>{
    try{
        const {CourseName} = req.body;
        console.log(CourseName);
        if(course.get(CourseName)){
            course.delete(CourseName);
            res.status(200).json({msg:"Course deleted successfully"});
        }else{
            res.status(404).json({msg:"Course not found"});
        }
    } catch{
        res.status(500).json({msg:"Internal Server Error"})
    }
})

export default adminAuth