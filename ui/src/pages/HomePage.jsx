import React from "react";
import CourseGrid from "../components/CourseGrid";
import TopCourses from "../components/TopCourses"
import AllCourseButton from "../components/AllCourseButton";
import HeroSection from "../components/HeroSection"

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <TopCourses />
      <CourseGrid isHome={true} />
      <AllCourseButton />
    </>
  );
};

export default HomePage;
