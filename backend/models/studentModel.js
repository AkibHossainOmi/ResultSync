const pool = require('../config/database');

class Student {
  static insertStudent(name, regNo) {
    return new Promise((resolve, reject) => {
      pool.query('INSERT INTO Student (name, reg_no) VALUES (?, ?)', [name, regNo], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

  static getAllStudents() {
    return new Promise((resolve, reject) => {
      pool.query('SELECT id, name, reg_no as registrationNo FROM Student', (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }
}

module.exports = Student;
