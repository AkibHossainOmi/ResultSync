const pool = require('../config/database');

class Subject {
  static insertSubject(subjectCode, subjectName, semester, added_by) {
    return new Promise((resolve, reject) => {
      pool.query('INSERT INTO Subject (subject_code, subject_name, semester, added_by) VALUES (?, ?, ?, ?)', [subjectCode, subjectName, semester, added_by], (error, results) => {
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

  static deleteBySubjectCode(subjectCode) {
    return new Promise((resolve, reject) => {
      pool.query(
        'DELETE FROM Subject WHERE subject_code = ?',
        [subjectCode],
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

  static updateBySubjectCode(oldSubjectCode, newSubjectCode, subjectName, semester) {
    return new Promise((resolve, reject) => {
      pool.query(
        'UPDATE Subject SET subject_code = ?, subject_name = ?, semester = ? WHERE subject_code = ?',
        [newSubjectCode, subjectName, semester, oldSubjectCode],
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

module.exports = Subject;
