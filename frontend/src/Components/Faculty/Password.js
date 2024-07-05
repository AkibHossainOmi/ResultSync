import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../Hooks/UseAuth';

export default function Password() {
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const isAuthenticated = useAuth();

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/auth/${token}`)
      .then(response => {
        if (response.data.success) {
          setEmail(response.data.decoded.email);
        } else {
          setError('The link is not valid or has expired.');
        }
      })
      .catch(error => {
        console.error('Error validating token:', error);
        setError('Error validating token');
      });
  }, [token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'password') {
      setPassword(value);
    } else if (name === 'confirmPassword') {
      setConfirmPassword(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    axios.post(`${process.env.REACT_APP_API_URL}/auth/password`, { email, password })
      .then(response => {
        setMessage(response.data.message);
        localStorage.setItem('authToken', token);
        localStorage.setItem('email', email);
        navigate('/subject');
      })
      .catch(error => {
        setError(error.response.data.message || 'Failed to set password');
      });
  };

  return !isAuthenticated ? (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-40 flex justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full md:w-1/2 lg:w-1/3">
          {error && <p className="text-red-600 text-center text-xl font-bold mb-4">{error}</p>}
          {!error && (
            <>
            <div className='flex justify-center'>
          <img className='h-20 mb-10 mt-10 pl-4' src='DIITLogo.png'></img>
          </div>
              <h2 className="text-xl font-bold text-center mb-6">Set Password</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="password" className="block text-sm font-semibold text-gray-800">Password</label>
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
                <div className="mb-4">
                  <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-800">Confirm Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={handleInputChange}
                    className="block w-full px-3 py-2 mt-2 text-gray-800 bg-gray-200 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring focus:ring-opacity-40"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Set Password
                </button>
                {message && <p className="text-green-500 text-sm mt-2">{message}</p>}
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  ) : <Navigate to="/" />;
}
