import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';

const SubjectController = () => {
  const [subjectCode, setSubjectCode] = useState('');
  const [subjectName, setSubjectName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/subjects', {
        subjectCode,
        subjectName
      });
      setMessage(response.data.message);
      setSubjectCode('');
      setSubjectName('');
    } catch (error) {
      console.error('Error adding subject:', error);
      setMessage('Error adding subject. Please try again.');
    }
  };

  return (
    <div>
      <Navbar/>
      <div className="mt-60 container mx-auto">
        {message && <p className="bg-green-200 text-green-800 py-2 px-4 rounded mb-4">{message}</p>}
        <h2 className="text-2xl font-bold mb-4 flex justify-center">Add New Subject</h2>
        <form onSubmit={handleSubmit} className="w-1/2 mx-auto">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="subjectCode">
              Subject Code
            </label>
            <input
              type="text"
              id="subjectCode"
              value={subjectCode}
              onChange={(e) => setSubjectCode(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="subjectName">
              Subject Name
            </label>
            <input
              type="text"
              id="subjectName"
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Add Subject
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubjectController;
