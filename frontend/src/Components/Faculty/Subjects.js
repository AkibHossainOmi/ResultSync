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
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="sm:w-2/3 container mx-auto py-40">
        <div className="pt-10 pb-10 pl-10 pr-10 bg-white rounded-lg shadow-md overflow-hidden">
          <h2 className="text-xl font-bold text-center mt-8 mb-4">All Subjects</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Subject Code</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Subject Name</th>
                  <th className="px-6 py-3 text-center text-sm font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Semester</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {subjects.map((subject) => (
                  <tr key={subject.code}>
                    {editSubjectCode === subject.code ? (
                      <>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="text"
                            name="code"
                            value={editFormData.code}
                            onChange={handleEditFormChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                          />
                        </td>
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
                            name="semester"
                            value={editFormData.semester}
                            onChange={handleEditFormChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                          />
                        </td>
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
                            onClick={() => setEditSubjectCode(null)}
                            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            Cancel
                          </button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{subject.code}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{subject.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{subject.semester}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => handleEditClick(subject)}
                            className="text-indigo-600 hover:text-indigo-900 mr-3"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteSubject(subject.code)}
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

export default Subjects;
