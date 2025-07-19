const dayjs = require('dayjs');
const weekday = require('dayjs/plugin/weekday');
const isBetween = require('dayjs/plugin/isBetween');
dayjs.extend(weekday);
dayjs.extend(isBetween);

// Get all weekdays (Mon–Fri) between two dates
function getWeekdaysBetween(start, end) {
  const dates = [];
  let current = dayjs(start);
  const last = dayjs(end);

  while (current.isBefore(last) || current.isSame(last)) {
    if (current.day() >= 1 && current.day() <= 5) {
      dates.push(current.format('YYYY-MM-DD'));
    }
    current = current.add(1, 'day');
  }
  return dates;
}

// Calculate attendance stats
function calculateAttendance(timetable, absences, dates) {
  const subjectStats = {};

  dates.forEach(date => {
    const dayIndex = dayjs(date).day() - 1; // 0 = Monday
    if (dayIndex >= 0 && dayIndex <= 4) {
      timetable[dayIndex].forEach(subject => {
        if (!subject) return;
        if (!subjectStats[subject]) subjectStats[subject] = { total: 0, attended: 0 };
        subjectStats[subject].total++;
        if (!absences.includes(date)) {
          subjectStats[subject].attended++;
        }
      });
    }
  });

  return Object.entries(subjectStats).map(([subject, { total, attended }]) => ({
    subject,
    total,
    attended,
    missed: total - attended,
    percentage: Math.round((attended / total) * 100),
  }));
}

module.exports = {
  getWeekdaysBetween,
  calculateAttendance,
};
