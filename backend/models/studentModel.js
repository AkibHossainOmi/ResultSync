const pool = require('../config/database');

class Student {
  static insertStudent(name, regNo, added_by) {
    return new Promise((resolve, reject) => {
      pool.query('INSERT INTO Student (name, reg_no, added_by) VALUES (?, ?, ?)', [name, regNo, added_by], (error, results) => {
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

  static deleteByRegistrationNo(registrationNo) {
    return new Promise((resolve, reject) => {
      pool.query('DELETE FROM Student WHERE reg_no = ?', [registrationNo], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

  static updateByRegistrationNo(oldRegistrationNo, updatedData) {
    const { name, registrationNo } = updatedData;
    return new Promise((resolve, reject) => {
      pool.query(
        'UPDATE Student SET name = ?, reg_no = ? WHERE reg_no = ?',
        [name, registrationNo, oldRegistrationNo],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        }
      );
    });
  }
}

module.exports = Student;
