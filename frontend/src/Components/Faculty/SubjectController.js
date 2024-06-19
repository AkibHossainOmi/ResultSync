import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import Navbar from '../Navbar/Navbar';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook

const semesters = [
  { value: '1', label: 'Semester 1' },
  { value: '2', label: 'Semester 2' },
  { value: '3', label: 'Semester 3' },
  { value: '4', label: 'Semester 4' },
  { value: '5', label: 'Semester 5' },
  { value: '6', label: 'Semester 6' },
  { value: '7', label: 'Semester 7' },
  { value: '8', label: 'Semester 8' },
  { value: '9', label: 'Semester 9' },
  { value: '10', label: 'Semester 10' },
  { value: '11', label: 'Semester 11' },
  { value: '12', label: 'Semester 12' },
];

const SubjectController = () => {
  const [subjectCode, setSubjectCode] = useState('');
  const [subjectName, setSubjectName] = useState('');
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [message, setMessage] = useState('');

  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedSemester) {
      setMessage('Please select a semester.');
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/subjects`, {
        subjectCode,
        subjectName,
        semester: selectedSemester.value,
        added_by: localStorage.getItem('email'),
      });
      setMessage(response.data.message);
      setSubjectCode('');
      setSubjectName('');
      setSelectedSemester(null);
    } catch (error) {
      console.error('Error adding subject:', error);
      setMessage(error.response?.data?.error || 'An error occurred');
    }
  };

  const handleViewAll = () => {
    navigate('/subjects'); // Navigate to the subject list page
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="sm:w-2/4 container mx-auto px-4 py-40">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 pt-10 pb-10">
            <h2 className="text-xl font-bold mb-4 text-center">Add New Subject</h2>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="mb-4">
                <label htmlFor="subjectCode" className="block text-sm font-medium text-gray-700">Subject Code</label>
                <input
                  id="subjectCode"
                  type="text"
                  value={subjectCode}
                  onChange={(e) => setSubjectCode(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter Subject Code"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="subjectName" className="block text-sm font-medium text-gray-700">Subject Name</label>
                <input
                  id="subjectName"
                  type="text"
                  value={subjectName}
                  onChange={(e) => setSubjectName(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter Subject Name"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="semester" className="block text-sm font-medium text-gray-700">Semester</label>
                <Select
                  id="semester"
                  options={semesters}
                  value={selectedSemester}
                  onChange={setSelectedSemester}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Select Semester"
                  required
                  menuPortalTarget={document.body}
                  styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                />
              </div>
              <div className="flex justify-between">
                <button type="submit" 
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Add Subject
                </button>
                <button
                  type="button"
                  onClick={handleViewAll} // Attach the handler
                  className="ml-3 inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 border border-transparent rounded-md shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  View All
                </button>
              </div>
            </form>
            {message && <p className="text-green-700 text-center mt-4">{message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubjectController;
