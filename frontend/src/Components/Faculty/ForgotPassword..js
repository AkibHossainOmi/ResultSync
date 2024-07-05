import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import { useAuth } from '../Hooks/UseAuth';
import { Navigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [tokenStatus, setTokenStatus] = useState('');
  const isAuthenticated = useAuth();

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/reset`, { email });
      setMessage("Password reset link sent. Please check your email.");
      setTokenStatus(response.data.message);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setMessage("Email doesn't exist.");
      } else {
        setMessage("Error occurred.");
        console.error('Error initiating reset via email:', error);
        if (error.response) {
          setTokenStatus(error.response.data.message);
        } else {
          setTokenStatus('Error initiating reset via email');
          console.log(tokenStatus);
        }
      }
    }
  };

  return !isAuthenticated ? (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-40 flex justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full md:w-1/2 lg:w-1/3">
        <div className='flex justify-center'>
          <img className='h-20 mb-10 mt-10 pl-4' src='DIITLogo.png'></img>
          </div>
          <h2 className="text-xl font-bold text-center mb-6">Forgot Password</h2>
          <form onSubmit={handleReset}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-semibold text-gray-800">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleInputChange}
                className="block w-full px-3 py-2 mt-2 text-gray-800 bg-gray-200 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring focus:ring-opacity-40"
                required
              />
            </div>
            {message && <p className="mb-4 text-sm text-gray-600">{message}</p>}
            <button
              type="submit"
              className="w-full inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Reset
            </button>
            <div className="flex items-center justify-between mt-4 mb-4">
              <p className="text-xs text-gray-600">
                Remember your password?{' '}
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

export default ForgotPassword;
