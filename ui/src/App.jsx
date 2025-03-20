// ui/src/App.jsx
import React from "react";
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from "react-router-dom";

// Layouts
import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";

// Pages
import HomePage from "./pages/HomePage";
import CoursesPage from "./pages/CoursesPage";
import AddCourse from "./pages/Addcourse";
import ContactPage from "./pages/ContactPage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import EditCourse from "./pages/EditCourse";
import NotFound from "./pages/NotFound";
import CoursesListingPage from "./pages/CoursesListingPage";
import CourseDetailsPage from "./pages/CourseDetailsPage"

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
         {/* AUTH LAYOUT  */}
        <Route path="/auth" element={<AuthLayout />}>
          <Route index element={<Login />} />
          <Route path="sign-up" element={<SignUp />} />
        </Route>

        {/* MAIN LAYOUT */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="courses" element={<CoursesPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="add-course" element={<AddCourse />} />
          <Route path="dashboard" element={<Dashboard />} /> 
          <Route path="listing" element={<CoursesListingPage />} /> 
          <Route path="/course/:courseName" element={<CourseDetailsPage />} />


          {/* Edit course route by courseName param. */}
           <Route path="edit-course/:courseName" element={<EditCourse />} /> 

          {/* Fallback for 404 */}
           <Route path="*" element={<NotFound />} /> 
        </Route>
      </>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;