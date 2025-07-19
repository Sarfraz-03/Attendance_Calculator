import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SemesterSetup from './components/SemesterSetup';
import AbsenceChecker from './components/AbsenceChecker';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 p-6">
        <nav className="mb-8 flex justify-center">
          <ul className="flex gap-6">
            <li>
              <Link
                to="/"
                className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-bold shadow hover:from-blue-600 hover:to-pink-600 transition"
              >
                Current Semester
              </Link>
            </li>
            <li>
              <Link
                to="/absence-checker"
                className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-bold shadow hover:from-blue-600 hover:to-pink-600 transition"
              >
                Future Absence Checker
              </Link>
            </li>
          </ul>
        </nav>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <Routes>
            <Route path="/" element={<SemesterSetup />} />
            <Route path="/absence-checker" element={<AbsenceChecker />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;