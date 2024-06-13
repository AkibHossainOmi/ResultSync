const pool = require('../config/database');

class Subject {
  static insertSubject(subjectCode, subjectName, semester) {
    return new Promise((resolve, reject) => {
      pool.query('INSERT INTO Subject (subject_code, subject_name, semester) VALUES (?, ?, ?)', [subjectCode, subjectName, semester], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

  static getAllSubjects() {
    return new Promise((resolve, reject) => {
      pool.query('SELECT semester, subject_code as code, subject_name as name FROM Subject', (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }
}

module.exports = Subject;
