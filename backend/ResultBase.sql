-- DROP DATABASE ResultBase;
CREATE DATABASE IF NOT EXISTS ResultBase;
USE ResultBase;

CREATE TABLE IF NOT EXISTS Faculty (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS Subject (
    subject_code VARCHAR(10) PRIMARY KEY,
    subject_name VARCHAR(100) NOT NULL,
    semester INT NOT NULL,
    added_by VARCHAR(100),
    FOREIGN KEY (added_by) REFERENCES Faculty(email) ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS Student (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    reg_no VARCHAR(20) UNIQUE NOT NULL,
    added_by VARCHAR(100),
    FOREIGN KEY (added_by) REFERENCES Faculty(email) ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS Result (
    subject_code VARCHAR(10),
    reg_no VARCHAR(20),
    marks INT,
    PRIMARY KEY (subject_code, reg_no),
    FOREIGN KEY (subject_code) REFERENCES Subject(subject_code) ON UPDATE CASCADE,
    FOREIGN KEY (reg_no) REFERENCES Student(reg_no) ON UPDATE CASCADE
);

