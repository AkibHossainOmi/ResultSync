import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import Navbar from '../Navbar/Navbar';

const ResultController = () => {
  const [students, setStudents] = useState([]);
  const [marksData, setMarksData] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchStudents();
    fetchSubjects();
    setMarksData([{ registrationNo: '', subjectCode: '', marks: '' }]);
}, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:8000/students');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const fetchSubjects = async () => {
    try {
      const response = await axios.get('http://localhost:8000/subjects');
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
          subjectCode: selectedSubject.value,
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
    console.log(marksToSend);
      await axios.post('http://localhost:8000/results', marksToSend);
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
    <div>
      <Navbar/>
      <div className="pt-5 mt-60 container mx-auto">
        {message && <p className="bg-green-200 text-green-800 py-2 px-4 rounded mb-4">{message}</p>}
        <h2 className="text-2xl font-bold mb-4 flex justify-center">Enter Subject Marks</h2>
        <div className="flex justify-center mb-4">
          <Select
            options={subjects.map((subject) => ({ value: subject.code, label: subject.code + " - " + subject.name }))}
            value={selectedSubject}
            onChange={setSelectedSubject}
            className="w-1/2"
            placeholder="Select Subject"
          />
        </div>
        <div className="flex justify-center">
          <form className="w-2/4" onSubmit={handleSubmit}>
            <table className="w-full border-collapse border border-gray-200">
              <thead>
                <tr>
                  <th className="w-2/4 bg-gray-100 border border-gray-200 px-4 py-2">Registration No.</th>
                  <th className="bg-gray-100 border border-b-0 border-gray-200 px-4 py-2">Marks</th>
                </tr>
              </thead>
              <tbody>
                {marksData.map((rowData, index) => (
                  <tr key={index}>
                    <td className="border border-gray-200 px-4 py-2">
                      <Select
                        options={students.map((student) => ({ value: student.registrationNo, label: student.registrationNo }))}
                        value={{ value: rowData.registrationNo, label: rowData.registrationNo }}
                        onChange={(selectedOption) => {
                          const regNo = selectedOption.value;
                          const updatedMarksData = marksData.map((data, i) => {
                            if (i === index) {
                              return {
                                ...data,
                                subjectCode: selectedSubject?.value ,
                                registrationNo: regNo,
                              };
                            }
                            return data;
                          });
                          setMarksData(updatedMarksData);
                        }}
                        className="border border-gray-200 px-2 py-1 w-full"
                      />
                    </td>
                    <td className="border border-l-0 border-r-0 border-gray-200 px-4 py-2 flex">
                      <input
                        type="number"
                        className="border border-gray-200 px-2 py-1 w-full"
                        value={rowData.marks || ''}
                        onChange={(e) => handleMarksChange(e, index)}
                        disabled={!selectedSubject}
                      />
                      <button
                        type="button"
                        onClick={() => handleDeleteRow(index)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 ml-2 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4">
              <button type="button" onClick={handleAddRow} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Add Row
              </button>
              <button type="submit" className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Submit Marks
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

  );
};

export default ResultController;
