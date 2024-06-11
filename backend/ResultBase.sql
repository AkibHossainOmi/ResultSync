CREATE DATABASE IF NOT EXISTS ResultBase;
USE ResultBase;
CREATE TABLE IF NOT EXISTS Subject (
    subject_code VARCHAR(10) PRIMARY KEY,
    subject_name VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS Student (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    reg_no VARCHAR(20) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS Result (
    subject_code VARCHAR(10),
    reg_no VARCHAR(20),
    marks INT,
    PRIMARY KEY (subject_code, reg_no),
    FOREIGN KEY (subject_code) REFERENCES Subject(subject_code),
    FOREIGN KEY (reg_no) REFERENCES Student(reg_no)
);

