import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [editStudentRegNo, setEditStudentRegNo] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: '',
    registrationNo: ''
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/students`);
      setStudents(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleDeleteRow = async (registrationNo) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/students/${registrationNo}`);
      setStudents(students.filter(student => student.registrationNo !== registrationNo));
    } catch (error) {
      console.error('Error deleting student:', error);
      window.alert(error.response.data.error);
    }
  };

  const handleEditClick = (student) => {
    setEditStudentRegNo(student.registrationNo);
    setEditFormData({ name: student.name, registrationNo: student.registrationNo });
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleEditFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const { name, registrationNo } = editFormData;
      await axios.put(`${process.env.REACT_APP_API_URL}/students/${editStudentRegNo}`, {
        name,
        newRegistrationNo: registrationNo
      });
      setStudents(prevStudents =>
        prevStudents.map(student =>
          student.registrationNo === editStudentRegNo ? { ...student, name, registrationNo } : student
        )
      );
      setEditStudentRegNo(null);
    } catch (error) {
      console.error('Error updating student:', error);
      window.alert(error.response.data.error);
      setEditStudentRegNo(null);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="sm:w-2/3 container mx-auto pt-40">
        <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
          <h2 className="text-xl font-bold text-center mb-6">All Students</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Registration No.</th>
                  <th className="px-6 py-3 text-center text-sm font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {students.map(student => (
                  <tr key={student.registrationNo}>
                    {editStudentRegNo === student.registrationNo ? (
                      <>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="text"
                            name="name"
                            value={editFormData.name}
                            onChange={handleEditFormChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="text"
                            name="registrationNo"
                            value={editFormData.registrationNo}
                            onChange={handleEditFormChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap flex items-center space-x-2">
                          <button
                            type="button"
                            onClick={handleEditFormSubmit}
                            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditStudentRegNo(null)}
                            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            Cancel
                          </button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.registrationNo}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex justify-center">
                          <button
                            onClick={() => handleEditClick(student)}
                            className="text-indigo-600 hover:text-indigo-900 mr-3"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteRow(student.registrationNo)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Students;
