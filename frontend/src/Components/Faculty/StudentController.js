import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

const StudentController = () => {
  const [name, setName] = useState('');
  const [regNo, setRegNo] = useState('');
  const [message, setMessage] = useState('');
  const history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/students`, {
        name,
        regNo,
        added_by: localStorage.getItem('email')
      });
      setMessage(response.data.message);
      setName('');
      setRegNo('');
    } catch (error) {
      console.error('Error adding student:', error);
      setMessage('Student already exists.');
    }
  };

  const handleViewAllStudents = () => {
    history('/students');
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="sm:w-2/4 pt-40 pb-20 container mx-auto">
        <div className="max-w-4xl mx-auto bg-white p-16 rounded-lg shadow-md">
        <div className='flex justify-center'>
          <img className='h-20 mb-10 mt-10 pl-4' src='DIITLogo.png'></img>
          </div>
        <h2 className="text-xl font-bold mb-4 text-center">Add New Student</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Student Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='Enter Student Name'
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label htmlFor="regNo" className="block text-sm font-medium text-gray-700">
                Registration No.
              </label>
              <input
                type="text"
                id="regNo"
                value={regNo}
                onChange={(e) => setRegNo(e.target.value)}
                placeholder='Enter Registration No.'
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div className="flex justify-between">
              <button
                type="submit"
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Add Student
              </button>
              <button
                type="button"
                onClick={handleViewAllStudents}
                className="ml-3 inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 border border-transparent rounded-md shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                View All
              </button>
            </div>
          </form>
          {message && (
            <p className="mt-4 text-center text-sm text-green-800 bg-green-200 px-4 py-2 rounded">{message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentController;
