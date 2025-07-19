const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/attendance_calculator')
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error(err));

// Load routes
const semesterRoutes = require('./routes/semester');
app.use('/api/semester', semesterRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));