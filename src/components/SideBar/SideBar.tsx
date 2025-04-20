import React from 'react';
import { Link } from 'react-router-dom';

const SideNav: React.FC = () => {
  return (
    <nav className="w-64 bg-gray-800 text-white p-4">
      <ul>
        <li className="mb-4">
          <Link to="/student" className="block p-2 rounded hover:bg-gray-700">Student</Link>
        </li>
        <li className="mb-4">
          <Link to="/tutors" className="block p-2 rounded hover:bg-gray-700">Tutors</Link>
        </li>
        <li className="mb-4">
          <Link to="/result" className="block p-2 rounded hover:bg-gray-700">Result</Link>
        </li>
      </ul>
    </nav>
  );
};


export default SideNav;
