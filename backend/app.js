const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Import routes
const subjectRoutes  = require('./routes/subjectRoutes');
const studentRoutes = require('./routes/studentRoutes');
const resultRoutes = require('./routes/resultRoutes');

// Use routes
app.use('/subjects', subjectRoutes );
app.use('/students', studentRoutes);
app.use('/results', resultRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
