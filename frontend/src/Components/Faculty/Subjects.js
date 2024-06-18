import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';

const Subjects = () => {
  const [subjects, setSubjects] = useState([]);
  const [editSubjectCode, setEditSubjectCode] = useState(null);
  const [editFormData, setEditFormData] = useState({
    code: '',
    name: '',
    semester: '',
  });

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/subjects`);
      setSubjects(response.data);
    } catch (error) {
      console.error('Error fetching subjects:', error);
    }
  };

  const handleDeleteSubject = async (subjectCode) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/subjects/${subjectCode}`);
      setSubjects(subjects.filter(subject => subject.code !== subjectCode));
    } catch (error) {
      console.error('Error deleting subject:', error);
      window.alert(error.response.data.error);
    }
  };

  const handleEditClick = (subject) => {
    setEditSubjectCode(subject.code);
    setEditFormData({ code: subject.code, name: subject.name, semester: subject.semester });
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
      const { code, name, semester } = editFormData;
      await axios.put(`${process.env.REACT_APP_API_URL}/subjects/${editSubjectCode}`, {
        newSubjectCode: code,
        subjectName: name,
        semester
      });
      setSubjects((prevSubjects) =>
        prevSubjects.map((subject) =>
          subject.code === editSubjectCode ? { ...subject, code, name, semester } : subject
        )
      );
      setEditSubjectCode(null);
    } catch (error) {
      console.error('Error updating subject:', error);
      window.alert(error.response.data.error);
      setEditSubjectCode(null);
    }
  };

  return (
    <div>
      <div className="relative z-50">
        <Navbar />
      </div>
      <div className="pt-5 mt-40 container mx-auto">
        <h2 className="text-2xl font-bold mb-4 flex justify-center">All Subjects</h2>
        <div className="w-full md:w-3/4 mx-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="bg-gray-100 border border-gray-300 px-4 py-2 text-left">Subject Code</th>
                <th className="bg-gray-100 border border-gray-300 px-4 py-2 text-left">Subject Name</th>
                <th className="bg-gray-100 border border-gray-300 px-4 py-2 text-left">Semester</th>
                <th className="bg-gray-100 border border-gray-300 px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((subject) => (
                <tr key={subject.code}>
                  {editSubjectCode === subject.code ? (
                    <>
                      <td className="border border-gray-300 px-4 py-2">
                        <input
                          type="text"
                          name="code"
                          value={editFormData.code}
                          onChange={handleEditFormChange}
                          className="w-full px-2 py-1 border rounded"
                        />
                      </td>
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
                          name="semester"
                          value={editFormData.semester}
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
                      <td className="border border-gray-300 px-4 py-2">{subject.code}</td>
                      <td className="border border-gray-300 px-4 py-2">{subject.name}</td>
                      <td className="border border-gray-300 px-4 py-2">{subject.semester}</td>
                      <td className="border border-gray-300 px-4 py-2 flex space-x-2 flex justify-center">
                        <button
                          type="button"
                          onClick={() => handleEditClick(subject)}
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded mr-2"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteSubject(subject.code)}
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

export default Subjects;
