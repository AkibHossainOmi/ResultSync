import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import { useAuth } from '../Hooks/UseAuth';
import { Navigate, useNavigate } from 'react-router-dom';

export default function Login() {
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

  const handleLogin = (e) => {
    e.preventDefault();
    axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, { email, password })
      .then(response => {
        setMessage("Login successful.");
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('email', email);
        navigate("/result");
      })
      .catch(error => {
        setMessage("Invalid credentials. Please try again.");
        if (error.response) {
        } else {
          console.error('Error logging in:', error);
        }
      });
  };

  const isAuthenticated = useAuth();

  return !isAuthenticated ? (
    <div>
      <div className="relative z-50">
      <Navbar />
      </div>
      <div className="pt-5 mt-40 container mx-auto flex justify-center">
        <form className="mt-6 w-1/3" onSubmit={handleLogin}>
          <div className="mb-2">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-800">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleInputChange}
              className="block w-full px-4 py-2 mt-2 text-slate-700 bg-white border rounded-md focus:border-slate-400 focus:ring-slate-300 focus:outline-none focus:ring focus:ring-opacity-40"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="password" className="block text-sm font-semibold text-gray-800">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handleInputChange}
              className="block w-full px-4 py-2 mt-2 text-slate-700 bg-white border rounded-md focus:border-slate-400 focus:ring-slate-300 focus:outline-none focus:ring focus:ring-opacity-40"
              required
            />
          </div>
          {message && <p className="mt-2 text-sm text-red-600">{message}</p>}
          <a href="/forgot_password" className="text-xs text-slate-600 hover: ">
            Forgot Password?
          </a>
          <div className="mt-2">
            <button
              type="submit"
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-slate-500 rounded-md hover:bg-slate-600 focus:outline-none focus:bg-slate-600"
            >
              Login
            </button>
          </div>
          <p className="mt-8 text-xs font-light text-center text-slate-700">
              {" "}
              Don't have an account?{" "}
              <a
                  href="/register"
                  className="font-medium text-slate-600 hover: "
              >
                  Register
              </a>
          </p>
        </form>
      </div>
    </div>
  ) : <Navigate to="/" />;
}
