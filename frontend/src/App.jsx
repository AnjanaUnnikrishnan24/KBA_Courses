import React from "react";
import CourseGrid from "./components/CourseGrid";
import courses from "./assets/data/courses.json";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";

const App = () => {
  return (
    <>
    <Navbar />
    <HeroSection />
    <div className="container mx-auto my-10">
      <h1 className="text-2xl font-bold text-center text-purple-900 mb-6">
        Available Courses
      </h1>
      <CourseGrid courses={courses} />
    </div>
    </>
    
  );
};

export default App;
