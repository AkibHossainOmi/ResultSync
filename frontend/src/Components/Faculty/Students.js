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
    setEditFormData((prevFormData) => ({
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
      setStudents((prevStudents) =>
        prevStudents.map((student) =>
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
    <div>
      <div className="relative z-50">
        <Navbar />
      </div>
      <div className="pt-5 mt-40 container mx-auto">
        <h2 className="text-2xl font-bold mb-4 flex justify-center">All Students</h2>
        <div className="w-full md:w-3/4 mx-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="bg-gray-100 border border-gray-300 px-4 py-2 text-left">Name</th>
                <th className="bg-gray-100 border border-gray-300 px-4 py-2 text-left">Registration No.</th>
                <th className="bg-gray-100 border border-gray-300 px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.registrationNo}>
                  {editStudentRegNo === student.registrationNo ? (
                    <>
                      <td className="border border-gray-300 px-4 py-2">
                        <input
                          type="text"
                          name="name"
                          value={editFormData.name}
                          onChange={handleEditFormChange}
                          className="w-full px-2 py-1 border rounded"
                        />
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <input
                          type="text"
                          name="registrationNo"
                          value={editFormData.registrationNo}
                          onChange={handleEditFormChange}
                          className="w-full px-2 py-1 border rounded"
                        />
                      </td>
                      <td className="border border-gray-300 px-4 py-2 flex justify-center">
                        <button
                          type="button"
                          onClick={handleEditFormSubmit}
                          className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-4 rounded mr-2"
                        >
                          Save
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="border border-gray-300 px-4 py-2">{student.name}</td>
                      <td className="border border-gray-300 px-4 py-2">{student.registrationNo}</td>
                      <td className="border border-gray-300 px-4 py-2 flex space-x-2 flex justify-center">
                        <button
                          type="button"
                          onClick={() => handleEditClick(student)}
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded mr-2"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteRow(student.registrationNo)}
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded"
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
  );
};

export default Students;
