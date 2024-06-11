const pool = require('../config/database');

class Result {
  static insertResults(results) {
    return new Promise((resolve, reject) => {
      // Prepare values for batch insertion
      const values = results.map(result => [result.subjectCode, result.regNo, result.marks]);
      pool.query('INSERT INTO Result (subject_code, reg_no, marks) VALUES ?', [values], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }
}

module.exports = Result;
