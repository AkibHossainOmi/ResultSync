import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';

const StudentList = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:8000/students');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleDeleteRow = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/students/${id}`);
      setStudents(students.filter(student => student.id !== id));
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  return (
    <div>
      <Navbar/>
      <div className="pt-5 mt-60 container mx-auto">
        <h2 className="text-2xl font-bold mb-4 flex justify-center">All Students</h2>
        <div className="w-1/2 mx-auto">
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr>
                <th className="bg-gray-100 border border-gray-200 px-4 py-2">Name</th>
                <th colSpan='2' className="bg-gray-100 border border-gray-200 px-4 py-2">Registration No.</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td className="border border-gray-200 px-8 py-2">{student.name}</td>
                  <td className="border border-x-0 border-gray-200 px-8 py-2">{student.registrationNo}</td>
                  <td className="border border-x-0 border-gray-200 py-2">
                    <button
                      type="button"
                      onClick={() => handleDeleteRow(student.id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 ml-2 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentList;
