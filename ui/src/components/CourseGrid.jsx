import React, { useState, useEffect } from 'react';
import CourseCard from './CourseCard';

const CourseGrid = ({ isHome = true }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const courseList = isHome ? courses.slice(0, 5) : courses;

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch("/api/getAllCourses");
        if (!res.ok) {
          throw new Error(`Failed to fetch courses: ${res.status} ${res.statusText}`);
        }
        const data = await res.json();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setError("Failed to load courses. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  return (
    <>
      <h1
        className="flex flex-col items-center font-bold text-2xl md:text-4xl
                   text-purple-800 pt-10"
      >
        {isHome ? "Top Courses" : "All Courses"}
      </h1>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <p className="text-purple-800">Loading...</p>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center h-40">
          <p className="text-red-600">{error}</p>
        </div>
      ) : courseList.length === 0 ? (
        <div className="flex justify-center items-center h-40">
          <p className="text-purple-800">No courses found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mx-5 my-10">
          {courseList.map((course) => (
            <CourseCard key={course.courseId} course={course} />
          ))}
        </div>
      )}
    </>
  );
};

export default CourseGrid;