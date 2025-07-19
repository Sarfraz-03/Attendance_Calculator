const express = require('express');
const router = express.Router();
const Semester = require('../models/Semester');
const { getWeekdaysBetween, calculateAttendance } = require('../utils/attendance');

let semesterDoc = null; // in-memory cache for current semester

// Save or update semester data
router.post('/', async (req, res) => {
  const { startDate, endDate, timetable, absences } = req.body;
  await Semester.deleteMany(); // clear previous semester data
  semesterDoc = await Semester.create({ startDate, endDate, timetable, absences });
  res.send({ success: true });
});

// Generate current attendance report
router.get('/report', async (req, res) => {
  const semester = semesterDoc || await Semester.findOne();
  if (!semester) return res.status(404).send({ error: 'No semester found' });

  const dates = getWeekdaysBetween(semester.startDate, semester.endDate);
  const report = calculateAttendance(semester.timetable, semester.absences, dates);
  res.send(report);
});

// Simulate future absences
router.post('/future', async (req, res) => {
  const { futureAbsences } = req.body;
  const semester = semesterDoc || await Semester.findOne();
  if (!semester) return res.status(404).send({ error: 'No semester found' });

  const combinedAbsences = [...semester.absences, ...futureAbsences];
  const dates = getWeekdaysBetween(semester.startDate, semester.endDate);
  const report = calculateAttendance(semester.timetable, combinedAbsences, dates);
  res.send(report);
});

module.exports = router;
