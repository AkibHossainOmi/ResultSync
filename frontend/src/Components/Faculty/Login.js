import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import { useAuth } from '../Hooks/UseAuth';
import { Navigate } from 'react-router-dom';

export default function EmailLogin() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [tokenStatus, setTokenStatus] = useState('');

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault();


    axios.post('http://localhost:8000/auth', { email })
      .then(response => {
        setMessage("Login link sent. Please check your email.");
        setTokenStatus(response.data.message);
      })
      .catch(error => {
        setMessage("Provide faculty email");
        if (error.response) {
          setTokenStatus(error.response.data.message);
        } else {
          setTokenStatus('Error initiating login via email');
          console.log(tokenStatus);
        }
      });
  };
  const isAuthenticated = useAuth();
  return !isAuthenticated? (
    <div className="">
      <Navbar />
      <div className="mt-60 container mx-auto flex justify-center">
        <form className="mt-6 w-1/3" onSubmit={handleLogin}>
          <div className="mb-2">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-800">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleInputChange}
              className="block w-full px-4 py-2 mt-2 text-slate-700 bg-white border rounded-md focus:border-slate-400 focus:ring-slate-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
            {message&&<p className="mt-2 text-sm text-slate-600">{message}</p>}
          </div>
          <div className="mt-2">
            <button
              type="submit"
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-slate-500 rounded-md hover:bg-slate-600 focus:outline-none focus:bg-slate-600"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : <Navigate to="/" />;
}
