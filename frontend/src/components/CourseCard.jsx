import React, { useState } from "react";

const CourseCard = ({ course }) => {
  const [showFullDescription,setShowFullDescription] = useState(false);
  const description = showFullDescription? course.description : course.description.substring(0,80);

  return (
   

    <div className="bg-purple-100 rounded-md shadow-2xl flex flex-col items-center justify-center mx-5 my-5 py-10 w-96">
      <h2 className="font-bold text-lg text-purple-900">{course.title}</h2>
      <img src={course.image || "/images/rp.png"} alt="course thumbnail" className="w-80 h-40 object-cover" />
      <p className="text-black my-2 mx-5">{description}</p> 
      <button className="flex flex-col w-full px-5 text-purple-400 hover:text-purple-800" 
      onClick={()=>setShowFullDescription(!showFullDescription)}>{showFullDescription?'Less':'More'}</button>
      <a href={course.link || "#"} className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 self-start mx-5 mt-2">Learn More</a>
    </div>
  ); 
};

export default CourseCard;
