import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import { useAuth } from '../Hooks/UseAuth';
import { Navigate, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, { email, password });
      setMessage("Login successful.");
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('email', email);
      navigate("/result");
    } catch (error) {
      setMessage("Invalid credentials. Please try again.");
      if (error.response) {
        console.error('Error logging in:', error.response.data);
      } else {
        console.error('Error logging in:', error.message);
      }
    }
  };

  const isAuthenticated = useAuth();

  return !isAuthenticated ? (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-40 flex justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full md:w-1/2 lg:w-1/3">
          <h2 className="text-xl font-bold text-center mb-6">Login</h2>
          <form onSubmit={handleLogin}>
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
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-semibold text-gray-800">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={handleInputChange}
                className="block w-full px-3 py-2 mt-2 text-gray-800 bg-gray-200 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring focus:ring-opacity-40"
                required
              />
            </div>
            {message && <p className="mb-4 text-sm text-gray-600">{message}</p>}
            <div className="flex items-center justify-between mb-4">
              <a href="/forgot_password" className="text-xs text-gray-600 hover:text-blue-600">
                Forgot Password?
              </a>
            </div>
            <button
              type="submit"
              className="w-full inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              // className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Login
            </button>
            <div className="flex items-center justify-between mt-4 mb-4">
              <p className="text-xs text-gray-600">
                Don't have an account?{' '}
                <a href="/register" className="font-semibold text-blue-500 hover:text-blue-600">
                  Register
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  ) : <Navigate to="/" />;
};

export default Login;
