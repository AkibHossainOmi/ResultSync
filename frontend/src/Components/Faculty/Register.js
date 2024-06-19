import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import { useAuth } from '../Hooks/UseAuth';
import { Navigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, { email })
      .then(response => {
        setMessage("Email verification link sent. Please check your email.");
      })
      .catch(error => {
        if (error.response.status === 403) {
          setMessage("Email already exists.");
        } else {
          setMessage("Provide faculty email.");
        }
        console.error('Error registering:', error);
      });
  };

  const isAuthenticated = useAuth();

  return !isAuthenticated ? (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-40 flex justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full md:w-1/2 lg:w-1/3">
          <h2 className="text-xl font-bold text-center mb-6">Register</h2>
          <form onSubmit={handleRegister}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-semibold text-gray-800">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleInputChange}
                className="block w-full px-3 py-2 mt-2 text-gray-800 bg-gray-200 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring focus:ring-opacity-40"
                required
              />
              {message && <p className="mt-2 text-sm text-gray-600">{message}</p>}
            </div>
            <button
              type="submit"
              className="w-full inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              // className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Register
            </button>
            <div className="flex items-center justify-between mt-4 mb-4">
              <p className="text-xs text-gray-600">
                Already registered?{' '}
                <a href="/login" className="font-semibold text-blue-500 hover:text-blue-600">
                  Login
                </a>
              </p>
              </div>
          </form>
        </div>
      </div>
    </div>
  ) : <Navigate to="/" />;
};

export default Register;
