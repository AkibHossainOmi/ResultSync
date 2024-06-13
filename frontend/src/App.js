import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ResultController from './Components/Faculty/ResultController';
import SubjectController from './Components/Faculty/SubjectController';
import StudentController from './Components/Faculty/StudentController';
import StudentList from './Components/Faculty/StudentList';
import Navbar from './Components/Navbar/Navbar';
import Login from './Components/Faculty/Login';
import ProtectedRoute from './Components/Auth/ProtectedRoute';
import Authenticating from './Components/Auth/AuthController';
import Evaluation from './Components/Student/Evaluation';

function App() {
  return (
    <div className="font-roboto">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Evaluation />} />
          <Route path="/navbar" element={<Navbar />} />
          <Route path="/login" element={<Login />} />
          <Route path="/auth" element={<Authenticating />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/result" element={<ResultController />} />
            <Route path="/subject" element={<SubjectController />} />
            <Route path="/student" element={<StudentController />} />
            <Route path="/studentList" element={<StudentList />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
