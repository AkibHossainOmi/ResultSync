import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Hooks/UseAuth";

export default function Navbar() {
  const isAuthenticated = useAuth();
  const navigate = useNavigate();

  const handleLogout = (event) => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("email");
    console.log("Logged out successfully");
    navigate("/login");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", closeDropdown);

    return () => {
      document.removeEventListener("mousedown", closeDropdown);
    };
  }, []);

  const dropdownRef = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="bg-gray-900 shadow-lg fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link
              to="/"
              className="flex items-center text-white text-xl font-bold hover:text-gray-300"
            >
              ResultSync
            </Link>
            <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
              <NavLink to="/" text="Home" />
              {isAuthenticated && <NavLink to="/result" text="Result" />}
              {isAuthenticated && <NavLink to="/subject" text="Subject" />}
              {isAuthenticated && <NavLink to="/student" text="Student" />}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {isAuthenticated ? (
              <Link
                to="/login"
                onClick={handleLogout}
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Logout
              </Link>
            ) : (
              <div className="flex space-x-4">
                <NavLink to="/login" text="Login" />
                <NavLink
                  to="/register"
                  text="Register"
                  className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                />
              </div>
            )}
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={toggleDropdown}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white"
            >
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isDropdownOpen && (
        <div className="sm:hidden bg-gray-900">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <DropdownLink to="/" text="Home" />
            {isAuthenticated && <DropdownLink to="/result" text="Result" />}
            {isAuthenticated && <DropdownLink to="/subject" text="Subject" />}
            {isAuthenticated && <DropdownLink to="/student" text="Student" />}
            {isAuthenticated ? (
              <Link
                to="/login"
                onClick={handleLogout}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 flex justify-center"
              >
                Logout
              </Link>
            ) : (
              <>
                <DropdownLink to="/login" text="Login" />
                <DropdownLink to="/register" text="Register" />
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

const NavLink = ({ to, text, className }) => (
  <Link
    to={to}
    className={`text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium ${className}`}
  >
    {text}
  </Link>
);

const DropdownLink = ({ to, text }) => (
  <Link
    to={to}
    className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 flex justify-center"
  >
    {text}
  </Link>
);
