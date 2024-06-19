import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import Navbar from '../Navbar/Navbar';

const Evaluation = () => {
  const [registrationNo, setRegistrationNo] = useState('');
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState('');
  const [averageCGPA, setAverageCGPA] = useState(0); 

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

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="sm:w-2/4 container mx-auto px-4 py-40">
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
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-200">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700">Registration No.</th>
                      <th className="border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700">Subjects</th>
                      <th className="border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700">Marks</th>
                      <th className="border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700">CGPA</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((result, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="border border-gray-300 px-4 py-2 text-sm text-gray-800">{result.reg_no}</td>
                        <td className="border border-gray-300 px-4 py-2 text-sm text-gray-800">{result.subject_name}</td>
                        <td className="border border-gray-300 px-4 py-2 text-sm text-gray-800">{result.marks}</td>
                        <td className="border border-gray-300 px-4 py-2 text-sm text-gray-800">{result.cgpa.toFixed(2)}</td>
                      </tr>
                    ))}
                    <tr className="bg-gray-100">
                      <td className="border border-gray-300 px-4 py-2 text-sm font-bold text-gray-700" colSpan="3">Average CGPA</td>
                      <td className="border border-gray-300 px-4 py-2 text-sm font-bold text-gray-700">{averageCGPA.toFixed(2)}</td>
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
