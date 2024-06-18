import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ResultController from './Components/Faculty/ResultController';
import SubjectController from './Components/Faculty/SubjectController';
import StudentController from './Components/Faculty/StudentController';
import Navbar from './Components/Navbar/Navbar';
import Login from './Components/Faculty/Login';
import ProtectedRoute from './Components/Auth/ProtectedRoute';
import Evaluation from './Components/Student/Evaluation';
import Register from './Components/Faculty/Register';
import SetPassword from './Components/Faculty/Password';
import ForgotPassword from './Components/Faculty/ForgotPassword..js';
import Students from './Components/Faculty/Students.js';
import Subjects from './Components/Faculty/Subjects.js';

function App() {
  return (
    <div className="font-roboto">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Evaluation />} />
          <Route path="/navbar" element={<Navbar />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot_password" element={<ForgotPassword />} />
          <Route path="/register" element={<Register />} />
          <Route path="/auth" element={<SetPassword />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/result" element={<ResultController />} />
            <Route path="/subject" element={<SubjectController />} />
            <Route path="/student" element={<StudentController />} />
            <Route path="/students" element={<Students />} />
            <Route path="/subjects" element={<Subjects />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
