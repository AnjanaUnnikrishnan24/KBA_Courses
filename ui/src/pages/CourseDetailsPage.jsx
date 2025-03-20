import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const CourseDetailsPage = () => {
  const { courseName } = useParams(); // Get courseName from the URL
  const [course, setCourse] = useState(null); // State to store course details
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(""); // State to handle errors

  // Fetch course details
  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const res = await fetch(`/api/getCourse?courseName=${encodeURIComponent(courseName)}`);
        if (!res.ok) {
          throw new Error("Failed to fetch course details");
        }
        const data = await res.json();
        if (!data || !data.courseName) {
          throw new Error("Course not found");
        }
        setCourse(data); // Set course details in state
      } catch (err) {
        console.error(err);
        setError(err.message); // Set error message
        toast.error(err.message); // Show error toast
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchCourseDetails();
  }, [courseName]);

  // Loading state
  if (loading) {
    return <div className="p-4 text-center">Loading course details...</div>;
  }

  // Error state
  if (error) {
    return <div className="p-4 text-red-500 text-center">{error}</div>;
  }

  // Course details
  return (
    <div className="bg-white min-h-screen p-8">
      <div className="max-w-4xl mx-auto bg-purple-100 rounded-lg shadow-lg p-6">
        {/* Course Image */}
        {course.image && (
          <img
            src={course.image.startsWith("data:image") ? course.image : `data:image/jpeg;base64,${course.image}`}
            alt={course.courseName}
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
        )}

        {/* Course Name */}
        <h1 className="text-3xl font-bold text-purple-900 mb-4">
          {course.courseName}
        </h1>

        {/* Course ID */}
        <p className="text-gray-700 mb-2">
          <span className="font-semibold">Course ID:</span> {course.courseId}
        </p>

        {/* Course Type */}
        <p className="text-gray-700 mb-2">
          <span className="font-semibold">Course Type:</span> {course.courseType}
        </p>

        {/* Course Price */}
        <p className="text-gray-700 mb-4">
          <span className="font-semibold">Price:</span> ₹{course.price}
        </p>

        {/* Course Description */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold text-purple-900 mb-2">
            Description
          </h2>
          <p className="text-gray-700">{course.description}</p>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsPage;