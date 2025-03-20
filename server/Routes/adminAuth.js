import { Router } from "express";
import authenticate from "../Middleware/auth.js";
import upload from "../Middleware/upload.js";
import adminCheck from "../Middleware/adminCheck.js";
import { Course } from "../Models/sample.js";

const adminauth = Router();

const convertToBase64 = (buffer) => {
  return buffer.toString("base64");
};

// Add a new course
adminauth.post( "/addCourse", authenticate, adminCheck, upload.single("courseImage"), async (req, res) => {
    try {

      const { CourseName, CourseId, CourseType, Description, Price } = req.body;

      const existingCourse = await Course.findOne({ courseName: CourseName });
      if (existingCourse) {
        return res.status(400).json({ msg: "Course name already exists" });
      }

      let imageBase64 = null;
      if (req.file) {
        imageBase64 = convertToBase64(req.file.buffer);
      }

      const newCourse = new Course({
        courseName: CourseName,
        courseId: CourseId,
        courseType: CourseType,
        description: Description,
        price: Number(Price),
        image: imageBase64,
      });

      await newCourse.save();
      res.status(201).json({ msg: `${CourseName} stored successfully`, data: newCourse });
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: "Internal Server Error" });
    }
  }
);

// Get all courses
adminauth.get("/getAllCourses", async (req, res) => {
  try {
    const courses = await Course.find({});
    res.json(courses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

// Get a specific course by name
adminauth.get("/getCourse", async (req, res) => {
  try {
    const name = req.query.courseName;
    if (!name) {
      return res.status(400).json({ msg: "Course name is required" });
    }

    const result = await Course.findOne({ courseName: name });
    if (!result) {
      return res.status(404).json({ msg: "No such course found" });
    }

    res.json({
      courseName: result.courseName,
      courseId: result.courseId,
      courseType: result.courseType,
      description: result.description,
      price: result.price,
      image:result.imageBase64,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

// // Get course image
// adminauth.get("/getCourseImage", async (req, res) => {
//   try {
//     const name = req.query.courseName;
//     if (!name) {
//       return res.status(400).json({ msg: "Course name is required" });
//     }

//     const result = await Course.findOne({ courseName: name });
//     if (!result || !result.image) {
//       return res.status(404).json({ msg: "Image not found" });
//     }

//     const imageBuffer = Buffer.from(result.image, "base64");
//     const compressedImage = await sharp(imageBuffer)
//       .resize({ width: 300 })
//       .jpeg({ quality: 70 })
//       .toBuffer();
//     res.set("Content-Type", "image/jpeg");
//     res.send(compressedImage);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ msg: "Internal Server Error" });
//   }
// });

// Update a course
adminauth.put( "/updateCourse", authenticate, adminCheck, upload.single("courseImage"), async (req, res) => {
    try {
      const { CourseName, CourseId, CourseType, Description, Price } = req.body;

       if (!CourseName || !CourseId || !CourseType || !Description || !Price) {
        return res.status(400).json({ msg: "All fields are required" });
      }

       const result = await Course.findOne({ courseName: CourseName });
      if (!result) {
        return res.status(404).json({ msg: "No such course exists" });
      }

      result.courseId = CourseId;
      result.courseType = CourseType;
      result.description = Description;
      result.price = Price;

       if (req.file) {
        result.image = convertToBase64(req.file.buffer);
      }

       await result.save();

      // Send success response
      res.status(200).json({ msg: "Course successfully updated", data: result });
    } catch (err) {
      console.error("Error updating course:", err);
      res.status(500).json({ msg: "Internal Server Error", error: err.message });
    }
  }
);

adminauth.delete("/deleteCourse", authenticate, adminCheck, async (req, res) => {
    try {
      const { courseName } = req.body;
      if (!courseName) {
        return res.status(400).json({ msg: "Course name is required" });
      }
      const result = await Course.findOneAndDelete({ courseName: courseName });
      if (!result) {
        return res.status(404).json({ msg: "Course not found" });
      }
      res.status(200).json({ msg: "Course successfully deleted" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: "Internal Server Error" });
    }
  }
);
 
export default adminauth;