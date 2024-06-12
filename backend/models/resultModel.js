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
}

module.exports = Result;
