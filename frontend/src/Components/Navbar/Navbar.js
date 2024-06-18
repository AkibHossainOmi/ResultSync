import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../Hooks/UseAuth";
import React, { useState, useEffect, useRef } from "react";

export default function Navbar() {
const isAuthenticated = useAuth();
const navigate = useNavigate();

const handleLogout = (event) => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('email');
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

  return isAuthenticated? 
  (<>
      <nav className="fixed flex w-full p-8 bg-slate-500 top-0 h-16 sm:h-16 md:h-16 lg:h-16 xl:h-16">
        <div className="flex items-center justify-between w-full">
            <div className="hidden sm:flex space-x-4 items-center">
                <Link to="/" className="bg-white text-white font-bold text-lg hover: flex justify-center">
                    <img src="https://diit.edu.bd/static/website/img/logo/header_logo_one.png" alt="ResultSync Logo" className="pt-2 pl-2 pr-2 pb-2 h-10 w-18" />
                </Link>
                <Link to="/" className="pl-5 text-white text-lg hover: ">
                    Home
                </Link>
                {/* <Link to="/evaluation" className="pl-3 text-white text-lg hover: ">
                  Evaluation
                </Link> */}
                <Link to="/result" className="pl-3 text-white text-lg hover: ">
                    Result
                </Link>
                <Link to="/subject" className="pl-3 text-white text-lg hover: ">
                    Subject
                </Link>
                <Link to="/student" className="pl-3 text-white text-lg hover: ">
                    Student
                </Link>
            </div>
            <div className="hidden sm:flex flex items-center">
                <Link to="/login" onClick={handleLogout} className="text-white text-lg hover:">
                    Logout
                </Link>
            </div>
        </div>

        <div className="sm:hidden flex items-center">
          <button className="text-white" onClick={toggleDropdown}>
            ☰
          </button>
          {isDropdownOpen && (
            <div className="mt-3 shadow-md rounded-md h-full top-10 absolute left-0">
              <ul className="bg-slate-500 p-0 space-y-1 py-5 w-screen flex flex-col items-center justify-center">
                <li>
                  <Link to="/" className="text-white text-lg hover: ">
                    Home
                  </Link>
                </li>
                <Link to="/result" className="text-white text-lg hover: ">
                    Result
                </Link>
                <Link to="/subject" className="text-white text-lg hover: ">
                    Subject
                </Link>
                <Link to="/student" className="text-white text-lg hover: ">
                    Student
                </Link>
                <Link to="/login" onClick={handleLogout} className="text-white text-lg hover:">
                    Logout
                </Link>
              </ul>
            </div>
          )}

        </div>

    </nav>
  </>)
  : (
    <>
     <nav className="fixed flex w-full p-8 bg-slate-500 top-0 h-16 sm:h-16 md:h-16 lg:h-16 xl:h-16">
        <div className="flex items-center justify-between w-full">
            <div className="hidden sm:flex space-x-4 items-center">
                <Link to="/" className="bg-white text-white font-bold text-lg hover: flex justify-center">
                    <img src="https://diit.edu.bd/static/website/img/logo/header_logo_one.png" alt="ResultSync Logo" className="pt-2 pl-2 pr-2 pb-2 h-10 w-18" />
                </Link>
                <Link to="/" className="pl-5 text-white text-lg hover: ">
                    Home
                </Link>
            </div>
            <div className="hidden sm:flex flex items-center">
                <Link to="/login" className="text-white text-lg hover:">
                    Login
                </Link>
                <Link to="/register" className="ml-8 text-white text-lg hover: ">
                  Register
                </Link>
            </div>
        </div>

        <div className="sm:hidden">
          <button className="text-white" onClick={toggleDropdown}>
            ☰
          </button>
          {isDropdownOpen && (
            <div className="mt-3 shadow-md rounded-md h-full top-10 absolute left-0">
              <ul className="bg-slate-500 p-0 space-y-1 py-5 w-screen flex flex-col items-center justify-center">
                <li>
                  <Link to="/" className="ml-8 text-white text-lg hover: ">
                    Home
                  </Link>
                </li>
                 <>
                  <li>
                    <Link to="/login" className="ml-8 text-white text-lg hover: ">
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link to="/register" className="ml-8 text-white text-lg hover: ">
                      Register
                    </Link>
                  </li>
                  </>
                
              </ul>
            </div>
          )}

        </div>
    </nav>
    </>
  );
}