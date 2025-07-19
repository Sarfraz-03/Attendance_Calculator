import React, { useState } from 'react';
import axios from 'axios';
import DatePicker from "react-multi-date-picker";


const SemesterSetup = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [timetable, setTimetable] = useState([
    ['', '', '', '', '', ''], // Monday
    ['', '', '', '', '', ''], // Tuesday
    ['', '', '', '', '', ''], // Wednesday
    ['', '', '', '', '', ''], // Thursday
    ['', '', '', '', '', ''], // Friday
  ]);
  const [absences, setAbsences] = useState([]);
  const [attendance, setAttendance] = useState([]);

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:5000/api/semester', {
        startDate,
        endDate,
        timetable,
        absences,
      });
      const res = await axios.get('http://localhost:5000/api/semester/report');
      setAttendance(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const updateTimetable = (dayIdx, slotIdx, value) => {
    const newTimetable = [...timetable];
    newTimetable[dayIdx][slotIdx] = value;
    setTimetable(newTimetable);
  };

  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 py-10">
      <div className="max-w-4xl mx-auto p-8 bg-white/90 rounded-2xl shadow-2xl border border-blue-200">
        <h2 className="text-3xl font-extrabold text-blue-700 mb-6 text-center drop-shadow">
          Enter Semester Details
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full p-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 bg-blue-50 placeholder:text-blue-300"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full p-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 bg-blue-50 placeholder:text-blue-300"
            />
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-bold text-purple-700 mb-4">Timetable (Mon–Fri)</h3>
          <div className="space-y-4">
            {weekdays.map((day, i) => (
              <div key={i}>
                <p className="font-semibold text-blue-600 mb-1">{day}</p>
                <div className="grid grid-cols-6 gap-2">
                  {timetable[i].map((subject, j) => (
                    <input
                      key={j}
                      className="p-2 border border-blue-200 rounded-lg bg-blue-50 focus:outline-none focus:ring-2 focus:ring-pink-400 placeholder:text-blue-300"
                      value={subject}
                      onChange={(e) => updateTimetable(i, j, e.target.value)}
                      placeholder={`Slot ${j + 1}`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

          <div className="mb-8">
            <label className="block text-gray-700 font-semibold mb-2">
           Absent Dates <span className="text-blue-500">(select multiple)</span>
          </label>
            <DatePicker
           multiple
           value={absences}
            onChange={dates => setAbsences(dates.map(d => d.format("YYYY-MM-DD")))}
           format="YYYY-MM-DD"
             className="w-full p-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 bg-blue-50 placeholder:text-blue-300"
              placeholder="Select absent dates"
              />
             </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-bold py-3 rounded-lg shadow hover:from-blue-600 hover:to-pink-600 transition mb-4"
        >
          Submit & Calculate Attendance
        </button>
        {attendance.length === 0 && (
  <div className="text-center text-gray-500 mt-8">
    No attendance data to display. Please submit the form.
  </div>
)}

        {attendance.length > 0 && (
          <div className="mt-8">
            <h3 className="text-xl font-bold text-purple-700 mb-4">Attendance Report:</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse rounded-xl overflow-hidden shadow">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-white">
                    <th className="border border-blue-200 px-4 py-2 text-left">Subject</th>
                    <th className="border border-blue-200 px-4 py-2 text-left">Total</th>
                    <th className="border border-blue-200 px-4 py-2 text-left">Attended</th>
                    <th className="border border-blue-200 px-4 py-2 text-left">Missed</th>
                    <th className="border border-blue-200 px-4 py-2 text-left">%</th>
                  </tr>
                </thead>
                <tbody>
                  {attendance.map((a, idx) => (
                    <tr
                      key={idx}
                      className={`${
                        idx % 2 === 0 ? 'bg-blue-50' : 'bg-pink-50'
                      } hover:bg-purple-100 transition`}
                    >
                      <td className="border border-blue-100 px-4 py-2 font-semibold text-blue-700">{a.subject}</td>
                      <td className="border border-blue-100 px-4 py-2">{a.total}</td>
                      <td className="border border-blue-100 px-4 py-2">{a.attended}</td>
                      <td className="border border-blue-100 px-4 py-2">{a.missed}</td>
                      <td className="border border-blue-100 px-4 py-2 font-bold">{a.percentage}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SemesterSetup;