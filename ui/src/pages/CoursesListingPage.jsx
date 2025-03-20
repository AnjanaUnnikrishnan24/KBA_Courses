import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CoursesListingPage = () => {
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const response = await fetch('/api/getAllCourses');
            if (!response.ok) {
                throw new Error('Failed to fetch courses');
            }
            const data = await response.json();
            setCourses(data);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    const handleDelete = async (courseName) => {
        try {
            const response = await fetch('/api/deleteCourse', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ courseName }),
            });
            if (response.ok) {
                setCourses(courses.filter(course => course.courseName !== courseName));
            } else {
                console.error('Failed to delete course');
            }
        } catch (error) {
            console.error('Error deleting course:', error);
        }
    };

    const handleEdit = (courseName) => {
        navigate(`/edit-course/${courseName}`);
    };

    return (
        <div className="pt-24 p-8">
            <h1 className="text-3xl font-bold mb-6">Courses Management</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-purple-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-purple-900 uppercase tracking-wider">
                                Course Name
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-purple-900 uppercase tracking-wider">
                                Course ID
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-purple-900 uppercase tracking-wider">
                                Course Type
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-purple-900 uppercase tracking-wider">
                                Price
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-purple-900 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {courses.map((course) => (
                            <tr key={course.courseId} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 text-sm text-gray-700">{course.courseName}</td>
                                <td className="px-6 py-4 text-sm text-gray-700">{course.courseId}</td>
                                <td className="px-6 py-4 text-sm text-gray-700">{course.courseType}</td>
                                <td className="px-6 py-4 text-sm text-gray-700">${course.price}</td>
                                <td className="px-6 py-4 space-x-2">
                                    <button
                                        onClick={() => handleEdit(course.courseName)}
                                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(course.courseName)}
                                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CoursesListingPage;