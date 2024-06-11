import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ResultController from './Components/Faculty/ResultController';
import SubjectController from './Components/Faculty/SubjectController';
import StudentController from './Components/Faculty/StudentController';
import StudentList from './Components/Faculty/StudentList';


function App() {
  return (
    <div className="font-roboto">
      <BrowserRouter>
        <Routes>
        <Route path="/result" element={<ResultController />} />
        <Route path="/subject" element={<SubjectController />} />
        <Route path="/student" element={<StudentController />} />
        <Route path="/studentList" element={<StudentList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
