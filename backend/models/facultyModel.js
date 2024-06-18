const pool = require('../config/database');
const bcrypt = require('bcrypt');

class Faculty {
  static async getByEmail(email) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM Faculty WHERE email = ?';
      pool.query(query, [email], (error, results) => {
        if (error) {
          console.error('Error fetching faculty by email:', error);
          reject(error);
        } else {
          if (results.length > 0) {
            resolve(results[0]);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  static checkEmailExists(email) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT 1 FROM Faculty WHERE email = ?';
      pool.query(query, [email], (error, results) => {
        if (error) {
          console.error('Error checking email existence:', error);
          reject(error);
        } else {
          resolve(results.length > 0);
        }
      });
    });
  }

  static async setPassword(email, password) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const query = 'INSERT INTO Faculty (email, password) VALUES (?, ?) ON DUPLICATE KEY UPDATE password = VALUES(password)';
      const [result] = await pool.promise().execute(query, [email, hashedPassword]); 
      return result;
    } catch (error) {
      console.error('Error setting password:', error);
      throw error;
    }
  }
}

module.exports = Faculty;
