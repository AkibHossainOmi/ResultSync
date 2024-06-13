const pool = require('../config/database');

class Result {
  static insertResults(results) {
    return new Promise((resolve, reject) => {
      console.log(results);
      const values = results.map(result => [result.subject_code, result.reg_no, result.marks]);
      pool.query('INSERT INTO Result (subject_code, reg_no, marks) VALUES ?', [values], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

  static getResults(registrationNo, semester) {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT Result.reg_no, Result.subject_code, Result.marks, Subject.subject_name
        FROM Result
        JOIN Subject ON Result.subject_code = Subject.subject_code
        WHERE Result.reg_no = ? AND Subject.semester = ?
      `;
      pool.query(query, [registrationNo, semester], (error, results) => {
        if (error) {
          console.error('Error fetching results:', error);
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }
}

module.exports = Result;
