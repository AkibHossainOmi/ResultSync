# Result Management System

This is a web application for managing student results.

## Features

- Registration for faculty members.
- Email verification system for security.
- Reset password option.
- Secured log in system using `Json Web Token` (JWT).
- Password encryption. 
- Input bulk student results.
- View student result.
- Edit student result.
- Input subject.
- View all the subject.
- Edit subject informations.
- Input student details.
- View student details.
- Edit student details.

## Technologies Used

- React
- Node.js
- Express.js
- MySQL
- HTML
- Tailwind CSS

## Getting Started

### Prerequisites

- Node.js
- MySQL

### Installation

1. Clone the repository:

```bash
git clone https://github.com/AkibHossainOmi/ResultSync.git
cd ResultSync
```

2. Install dependencies for the client and server:

```bash
cd frontend
npm install
cd ../backend
npm install
```

3. Create a `.env` file in the `frontend` directory and add your credentials:

```plaintext
REACT_APP_API_URL=http://localhost:8000
```

3. Set up the MySQL database:

```sql
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
```

4. Create a `.env` file in the `backend` directory and add your credentials:

```plaintext
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=ResultBase
FRONTEND_URL=http://localhost:3000
EMAIL_PASSWORD=yourpassword
EMAIL_USER=youremail
```

5. Start the server:

```bash
cd backend
npm start
```

6. Start the client:

```bash
cd ../frontend
npm start
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MySQL](https://www.mysql.com/)
- [Tailwind CSS](https://tailwindcss.com/)