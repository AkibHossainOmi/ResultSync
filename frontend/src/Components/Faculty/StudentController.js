import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';

const StudentController = () => {
  const [name, setName] = useState('');
  const [regNo, setRegNo] = useState('');
  const [message, setMessage] = useState('');
  const history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/students', {
        name,
        regNo
      });
      setMessage(response.data.message);
      setName('');
      setRegNo('');
    } catch (error) {
      console.error('Error adding student:', error);
      setMessage('Error adding student. Please try again.');
    }
  };

  const handleViewAllStudents = () => {
    history('/studentList');
  };

  return (
    <div className="mt-20 container mx-auto">
      {message && <p className="bg-green-200 text-green-800 py-2 px-4 rounded mb-4">{message}</p>}
      <h2 className="text-2xl font-bold mb-4 flex justify-center">Add New Student</h2>
      <form onSubmit={handleSubmit} className="w-1/2 mx-auto">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Student Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="regNo">
            Registration No.
          </label>
          <input
            type="text"
            id="regNo"
            value={regNo}
            onChange={(e) => setRegNo(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Student
          </button>
          <button
            type="button"
            onClick={handleViewAllStudents}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            View All
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentController;
