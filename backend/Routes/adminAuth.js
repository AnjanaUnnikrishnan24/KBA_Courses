import {Router} from "express";
import authenticate from "../Middleware/auth.js";
import adminCheck from "../Middleware/adminCheck.js"
import { sample } from "../Models/sample.js";
import uploads from "../Middleware/upload1.js";

const adminAuth = Router();

const convertToBase64 = (buffer) =>{
    return buffer.toString("base64");
}

adminAuth.post('/addCourse', authenticate,adminCheck,uploads.single('courseImage'), async (req, res) => {
    try {
        const { CourseName, CourseId, CourseType, Description, Price } = req.body;
        console.log(CourseName);
        const existingCourse = await sample.findOne({cname:CourseName})
        if(existingCourse){
            res.status(401).send("Course Already exist");
        }else{
            let imageBase64 = null;
            if(req.file && req.file.buffer ){
                imageBase64 = convertToBase64(req.file.buffer);
            }
            //const imagePath= req.file ? req.file.path:"";
            const newCourse = new sample({
                cname :CourseName,
                cId:CourseId,
                ctype:CourseType,
                cdescription:Description,
                cprice:Price,
                //Image:imagePath
                Image:imageBase64
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
        // const name = req.query.CourseName;
        // console.log(name);

        // const result = await sample.findOne({cname:name});
        // console.log(result);

        // if (result) {   
        //     const imageBuffer = Buffer.from(result.Image, "base64")
        //     res.status(200).json({ 
        //         message:"Course found",
        //         data: {
        //         CourseName: result.cname,
        //         CourseId: result.cId,
        //         CourseType: result.ctype,
        //         Description: result.cdescription,
        //         Price: result.cprice,
        //         Image: imageBase64 // Send base64 image separately
        //     } });
        // } else {
        //     res.status(404).json({ message: "Course not found" });
        // }
        const name = req.query.CourseName;

        if (!name) {
            return res.status(400).json({ message: "CourseName query parameter is required" });
        }

        console.log("Searching for Course:", name);
        const result = await sample.findOne({ cname: name });

        if (!result) {
            return res.status(404).json({ message: "Course not found" });
        }

        let imageBase64 = null;
        if (result.Image) {
            imageBase64 = result.Image;  
        }

        res.status(200).json({
            message: "Course found",
            data: {
                CourseName: result.cname,
                CourseId: result.cId,
                CourseType: result.ctype,
                Description: result.cdescription,
                Price: result.cprice,
                Image: imageBase64 
            }
        });
    } catch {
        res.status(500).json({ message: "Internal Server Error" });
    }
});


adminAuth.put('/updateCourse', authenticate,adminCheck, async (req, res) => {
    try {
        const { CourseName, CourseId, CourseType, Description, Price } = req.body;
        const result = await sample.findOne({cname:CourseName});
        console.log(result);
        
        if(result){
            result.cname = CourseName;
            result.cId = CourseId;
            result.ctype = CourseType;
            result.cdescription = Description;
            result.cprice = Price;

            await result.save();
            res.status(201).send("Course updated successfully")
        }else{
            res.status(404).send("Course doesn't exist")
        }  
    }catch{
        res.status(500).send("Internal Server Error" );
    }
});


adminAuth.patch('/editCourse',authenticate,adminCheck,async(req,res)=>{
    try{
        const {CourseName,CourseType,Price}= req.body;
        console.log(CourseName);
        const result = await sample.findOne({cname:CourseName});
        console.log(result);

        if(result){
            result.ctype = CourseType;
            result.cprice = Price;

            await result.save();
            res.status(200).send("Course successfully updated");
        }
        else{
            res.status(404).send("Course not found");
        }
    } catch{
        res.status(500).send("Internal Server Error")
    }

})

adminAuth.delete('/deleteCourse',authenticate,adminCheck, async (req,res)=>{
    try{
        const {CourseName} = req.body;
        const result = await sample.findOne({cname:CourseName});
        console.log(result);
        if(result){
            await sample.findOneAndDelete({cname:CourseName});
            res.status(200).json({msg:"Course deleted successfully"});
        }else{
            res.status(404).json({msg:"Course not found"});
        }
    } catch{
        res.status(500).json({msg:"Internal Server Error"})
    }
})

export default adminAuth