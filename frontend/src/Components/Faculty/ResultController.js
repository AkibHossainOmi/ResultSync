import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import Navbar from '../Navbar/Navbar';

const ResultController = () => {
  const [students, setStudents] = useState([]);
  const [marksData, setMarksData] = useState([{ registrationNo: '', subjectCode: '', marks: '' }]);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchStudents();
    fetchSubjects();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/students`);
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const fetchSubjects = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/subjects`);
      setSubjects(response.data);
    } catch (error) {
      console.error('Error fetching subjects:', error);
    }
  };

  const handleMarksChange = (e, index) => {
    const updatedMarksData = marksData.map((data, i) => {
      if (i === index) {
        return {
          ...data,
          subjectCode: selectedSubject?.value,
          marks: parseInt(e.target.value),
        };
      }
      return data;
    });
    setMarksData(updatedMarksData);
  };

  const handleAddRow = () => {
    const newMarksData = [
      ...marksData,
      {
        registrationNo: '',
        marks: '',
      },
    ];
    setMarksData(newMarksData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const marksToSend = marksData.map(({ registrationNo, subjectCode, marks }) => ({
        subject_code: subjectCode,
        reg_no: registrationNo,
        marks,
      }));
      await axios.post(`${process.env.REACT_APP_API_URL}/results`, marksToSend);
      setMarksData([{registrationNo:'', subjectCode:'', marks:''}]);
      setMessage('Marks submitted successfully!');
    } catch (error) {
      console.error('Error submitting marks:', error);
      setMessage('Error submitting marks. Please try again.');
    }
  };

  const handleDeleteRow = (index) => {
    const updatedMarksData = marksData.filter((_, i) => i !== index);
    setMarksData(updatedMarksData);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="sm:w-full md:w-2/3 lg:w-2/4 xl:w-2/4 pt-40 pb-20 px-4 sm:px-6 md:px-8 lg:px-8 xl:px-8 mx-auto">
        <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
          <h2 className="text-xl font-bold text-center mb-6">Enter Subject Marks</h2>
          <div className="mb-6">
            <Select
              options={subjects.map((subject) => ({
                value: subject.code,
                label: `${subject.code} - ${subject.name}`,
              }))}
              value={selectedSubject}
              onChange={setSelectedSubject}
              className="w-full z-30"
              placeholder="Select Subject"
              styles={{
                control: (provided) => ({
                  ...provided,
                  zIndex: 30,
                }),
                menu: (provided) => ({
                  ...provided,
                  zIndex: 40,
                }),
              }}
            />
          </div>
          <form onSubmit={handleSubmit}>
            {marksData.map((rowData, index) => (
              <div key={index} className="flex flex-row items-center mb-4 space-x-4">
                <div className="sm:flex-[5]">
                  <Select
                    options={students.map((student) => ({
                      value: student.registrationNo,
                      label: student.registrationNo,
                    }))}
                    value={rowData.registrationNo ? { value: rowData.registrationNo, label: rowData.registrationNo } : null}
                    onChange={(selectedOption) => {
                      const regNo = selectedOption.value;
                      const updatedMarksData = marksData.map((data, i) =>
                        i === index ? { ...data, subjectCode: selectedSubject?.value, registrationNo: regNo } : data
                      );
                      setMarksData(updatedMarksData);
                    }}
                    className="w-full whitespace-nowrap"
                    placeholder="Select Reg. No."
                    styles={{
                      control: (provided) => ({
                        ...provided,
                        zIndex: 20,
                      }),
                      menu: (provided) => ({
                        ...provided,
                        zIndex: 30,
                      }),
                    }}
                  />
                </div>
                <div className="sm:flex-[4]">
                  <input
                    type="number"
                    placeholder='Marks'
                    className="border border-gray-300 px-3 py-2 w-full focus:outline-none"
                    value={rowData.marks || ''}
                    onChange={(e) => handleMarksChange(e, index)}
                    disabled={!selectedSubject}
                  />
                </div>
                <div className="flex-[1] sm:w-auto text-center sm:text-left">
                  <button
                    type="button"
                    onClick={() => handleDeleteRow(index)}
                    className="text-red-600 hover:text-red-900 focus:outline-none"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
            <div className="mt-6 flex flex-row justify-between space-y-0 space-x-4">
              <button
                type="submit"
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Submit Marks
              </button>
              <button
                type="button"
                onClick={handleAddRow}
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                + Add Row
              </button>
            </div>
          </form>
          {message && (
            <p className="mt-4 bg-green-100 text-green-700 py-2 px-4 rounded text-center">{message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultController;
