import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import Navbar from '../Navbar/Navbar';
import { useAuth } from "../Hooks/UseAuth";

const Evaluation = () => {
  const [registrationNo, setRegistrationNo] = useState('');
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState('');
  const [averageCGPA, setAverageCGPA] = useState(0);
  const [editIndex, setEditIndex] = useState(null);
  const [editFormData, setEditFormData] = useState({
    marks: ''
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResults([]);
    setMessage('');
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/results`, {
        params: {
          registrationNo,
          semester: selectedSemester.value,
        },
      });
      const resultsWithCGPA = response.data.map(result => ({
        ...result,
        cgpa: calculateCGPA(result.marks),
      }));
      setResults(resultsWithCGPA);
      calculateAverageCGPA(resultsWithCGPA);
    } catch (error) {
      console.error('Error fetching results:', error);
      setMessage(error.response.data.message);
    }
  };

  const calculateCGPA = (marks) => {
    if (marks >= 90) {
      return 4.0;
    } else if (marks >= 80) {
      return 3.5;
    } else if (marks >= 70) {
      return 3.0;
    } else if (marks >= 60) {
      return 2.5;
    } else if (marks >= 50) {
      return 2.0;
    } else if (marks >= 40) {
      return 1.0;
    } else {
      return 0.0;
    }
  };

  const calculateAverageCGPA = (results) => {
    if (results.length === 0) {
      setAverageCGPA(0);
      return;
    }

    const totalCGPA = results.reduce((sum, result) => sum + result.cgpa, 0);
    const average = totalCGPA / results.length;
    setAverageCGPA(average);
  };

  const handleEditClick = (index) => {
    setEditIndex(index);
    setEditFormData({
      marks: results[index].marks
    });
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleEditFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedResult = {
        ...results[editIndex],
        marks: editFormData.marks,
        cgpa: calculateCGPA(editFormData.marks)
      };

      await axios.put(`${process.env.REACT_APP_API_URL}/results`, {
        reg_no: updatedResult.reg_no,
        subject_code: updatedResult.subject_code,
        marks: updatedResult.marks
      });

      const updatedResults = [...results];
      updatedResults[editIndex] = updatedResult;
      setResults(updatedResults);
      calculateAverageCGPA(updatedResults);
      setEditIndex(null);
    } catch (error) {
      console.error('Error updating result:', error);
      window.alert(error.response.data.error);
      setEditIndex(null);
    }
  };

  const handleDeleteResult = async (index) => {
    try {
      const { reg_no, subject_code } = results[index];
      await axios.delete(`${process.env.REACT_APP_API_URL}/results`, {
        params: { reg_no, subject_code },
      });
      const newResults = results.filter((_, i) => i !== index);
      setResults(newResults);
      calculateAverageCGPA(newResults);
    } catch (error) {
      console.error('Error deleting result:', error);
      window.alert(error.response.data.error);
    }
  };

  const isAuthenticated = useAuth();

  return (
      <div className="bg-gray-100 min-h-screen">
        <Navbar />
        <div className="sm:w-3/4 container mx-auto px-4 py-40">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 pt-10 pb-10">
              <h2 className="text-xl font-bold mb-4 text-center">View Result</h2>
              <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="mb-4">
                  <label htmlFor="registrationNo" className="block text-sm font-medium text-gray-700">Registration No.</label>
                  <input
                      id="registrationNo"
                      type="text"
                      value={registrationNo}
                      onChange={(e) => setRegistrationNo(e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Enter Registration No."
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
                <div className="">
                  <button type="submit"
                          className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    View Result
                  </button>
                </div>
              </form>
              {message && <p className="text-red-700 text-center mt-4">{message}</p>}
            </div>
            {results.length > 0 && (
                <div className="p-6 flex justify-center">
                  <div className="overflow-x-auto">
                    <table className="min-w-3/4 divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Registration No.</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Subjects</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Marks</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">CGPA</th>
                        {isAuthenticated && (
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Actions</th>
                        )}
                      </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                      {results.map((result, index) => (
                          <tr key={index}>
                            {editIndex === index ? (
                                <>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{result.reg_no}</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{result.subject_name}</td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <input
                                        type="text"
                                        name="marks"
                                        value={editFormData.marks}
                                        onChange={handleEditFormChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                                    />
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{calculateCGPA(editFormData.marks).toFixed(2)}</td>
                                  {isAuthenticated && (
                                      <td className="px-6 py-4 whitespace-nowrap flex items-center space-x-2">
                                        <button
                                            type="button"
                                            onClick={handleEditFormSubmit}
                                            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                          Save
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setEditIndex(null)}
                                            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                          Cancel
                                        </button>
                                      </td>
                                  )}
                                </>
                            ) : (
                                <>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{result.reg_no}</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{result.subject_name}</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{result.marks}</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{result.cgpa.toFixed(2)}</td>
                                  {isAuthenticated && (
                                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button
                                            onClick={() => handleEditClick(index)}
                                            className="text-indigo-600 hover:text-indigo-900 mr-3"
                                        >
                                          Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteResult(index)}
                                            className="text-red-600 hover:text-red-900"
                                        >
                                          Delete
                                        </button>
                                      </td>
                                  )}
                                </>
                            )}
                          </tr>
                      ))}
                      <tr className="bg-gray-100">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-700" colSpan={isAuthenticated ? "4" : "3"}>Average CGPA</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-700">{averageCGPA.toFixed(2)}</td>
                        {isAuthenticated && <td className="px-6 py-4"></td>}
                      </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
            )}
          </div>
        </div>
      </div>
  );
};

export default Evaluation;
