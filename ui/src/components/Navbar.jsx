import React from "react";
import { Link } from "react-router-dom";
import Logo1 from "../assets/images/Logo1.png";
import Logout from "./Logout";
import useProfile from "../hooks/useProfile"; // Custom hook to fetch user profile

const Navbar = () => {
  const { profile, loading } = useProfile();

  // Show loading state while fetching profile
  if (loading) {
    return (
      <div className="bg-purple-100 text-purple-950 p-3 shadow-md">
        <p>Loading user...</p>
      </div>
    );
  }

  const userRole = profile?.userRole;

  return (
    <div className="navbar fixed top-0 left-0 w-full z-50 bg-purple-100 text-purple-950 grid grid-cols-1 md:grid-cols-2 p-3 shadow-md">
      {/* Logo Section */}
      <div className="flex items-center">
        <Link to="/">
          <img className="m-1 p-2 size-12" src={Logo1} alt="logo" />
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="flex justify-center md:justify-end items-center mt-2 md:mt-0 space-x-5 md:space-x-10">
        <Link to="/" className="hover:text-purple-700">
          Home
        </Link>
        <Link to="/courses" className="hover:text-purple-700">
          Courses
        </Link>
        <Link to="/contact" className="hover:text-purple-700">
          Contact Us
        </Link>

        {/* Show Login or Logout based on authentication status */}
        {profile ? (
          <>
            {/* Show Admin Links if user is admin */}
            {userRole === "admin" && (
              <>
                <Link to="/add-course" className="hover:text-purple-700">
                  Add Course
                </Link>
                <Link to="/listing" className="hover:text-purple-700">
                  All Courses
                </Link>
              </>
            )}
            {/* Logout Button */}
            <Logout />
          </>
        ) : (
          // Show Login Button if user is not logged in
          <Link to="/auth" className="hover:text-purple-700">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;