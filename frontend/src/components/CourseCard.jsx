import React from "react";

const CourseCard = ({ course }) => {
  return (
    <div className="bg-purple-100 rounded-md shadow-2xl flex flex-col items-center justify-center mx-5 my-5 py-10 w-96">
      <h2 className="font-bold text-lg text-purple-900">{course.title}</h2>
      <img src={course.image || "/images/rp.png"} alt="course thumbnail" className="w-80 h-40 object-cover" />
      <p className="text-black my-2 mx-5">{course.description}</p>
      <a href={course.link || "#"} className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 self-start mx-5 mt-2">Learn More</a>
    </div>
  );
};

export default CourseCard;
