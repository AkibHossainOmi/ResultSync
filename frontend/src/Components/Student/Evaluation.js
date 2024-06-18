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
    <div>
      <div className="relative z-50">
      <Navbar />
      </div>
      <div className="pt-5 mt-40 container mx-auto">
        <h2 className="text-2xl font-bold mb-4 flex justify-center">View Results</h2>
        <div className="flex justify-center mb-4">
          <form className="w-2/4" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="registrationNo">
                Registration No.
              </label>
              <input
                id="registrationNo"
                type="text"
                value={registrationNo}
                onChange={(e) => setRegistrationNo(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="semester">
                Semester
              </label>
              <Select
                options={semesters}
                value={selectedSemester}
                onChange={setSelectedSemester}
                className="w-full"
                placeholder="Select Semester"
                required
              />
            </div>
            <div className="flex justify-center">
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                View Result
              </button>
            </div>
          </form>
        </div>
          <div className='flex justify-center'>
            {message && <p className="w-2/4 bg-red-200 text-red-800 py-2 px-4 rounded mb-4 text-center">{message}</p>}
          </div>
          {results.length > 0 && <div className="mt-4 flex justify-center">
            <table className="w-2/4 mb-10 border-collapse border border-gray-200">
              <thead>
                <tr>
                  <th className="bg-gray-100 border border-gray-200 px-4 py-2">Registration No.</th>
                  <th className="bg-gray-100 border border-gray-200 px-4 py-2">Subjects</th>
                  <th className="bg-gray-100 border border-gray-200 px-4 py-2">Marks</th>
                  <th className="bg-gray-100 border border-gray-200 px-4 py-2">CGPA</th>
                </tr>
              </thead>
              <tbody>
                {results.map((result, index) => (
                  <tr key={index}>
                    <td className="border border-gray-200 px-4 py-2 text-center">{result.reg_no}</td>
                    <td className="border border-gray-200 px-4 py-2 text-center">{result.subject_name}</td>
                    <td className="border border-gray-200 px-4 py-2 text-center">{result.marks}</td>
                    <td className="border border-gray-200 px-4 py-2 text-center">{result.cgpa}</td>
                  </tr>
                ))}
                <tr>
                  <td className="border border-gray-200 px-4 py-2 text-center font-bold" colSpan="3">Average CGPA</td>
                  <td className="border border-gray-200 px-4 py-2 text-center font-bold">{averageCGPA.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>}
      </div>
    </div>
  );
};

export default Evaluation;
