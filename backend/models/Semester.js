const mongoose = require('mongoose');

const semesterSchema = new mongoose.Schema({
  startDate: String,
  endDate: String,
  timetable: Array, // 2D array [day][slot]
  absences: [String],
});

module.exports = mongoose.model('Semester', semesterSchema);