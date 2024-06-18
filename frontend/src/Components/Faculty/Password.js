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
        navigate('/result');
      })
      .catch(error => {
        setError(error.response.data.message || 'Failed to set password');
      });
  };

  return !isAuthenticated? (
    <div>
      <div className="relative z-50">
      <Navbar />
      </div>
      <div className="pt-5 mt-40 container mx-auto flex justify-center">
        <div className="max-w-md w-full bg-white px-8 pt-6 pb-8 mb-4">
          {error && <p className="text-red-600 text-center text-3xl font-bold">{error}</p>}
          {!error && (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-semibold text-gray-600">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={handleInputChange}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-600">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handleInputChange}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-slate-500 text-white rounded-md hover:bg-slate-600 focus:outline-none focus:bg-slate-600"
              >
                Set Password
              </button>
              {message && <p className="text-green-500 text-sm mt-2">{message}</p>}
            </form>
          )}
        </div>
      </div>
    </div>
  ) : <Navigate to="/" /> ;
}
