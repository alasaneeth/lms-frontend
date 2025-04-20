import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaUserGraduate, FaChalkboardTeacher, FaPoll } from 'react-icons/fa';

const SideNav: React.FC = () => {
  return (
    <nav className="w-64 h-screen bg-gray-800 text-white p-4 flex flex-col">
      {/* Logo/Image Section */}
      <div className="mb-6 flex justify-center">
        <img 
          src="/path-to-your-logo.png" 
          alt="Organization Logo" 
          className="h-16 object-contain" 
        />
      </div>

      {/* Navigation Links */}
      <ul>
        <li className="mb-4">
          <NavLink
            to="/student"
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded hover:bg-gray-700 ${isActive ? 'bg-gray-700 font-bold' : ''}`
            }
          >
            <FaUserGraduate />
            Student
          </NavLink>
        </li>
        <li className="mb-4">
          <NavLink
            to="/tutors"
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded hover:bg-gray-700 ${isActive ? 'bg-gray-700 font-bold' : ''}`
            }
          >
            <FaChalkboardTeacher />
            Tutors
          </NavLink>
        </li>
        <li className="mb-4">
          <NavLink
            to="/result"
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded hover:bg-gray-700 ${isActive ? 'bg-gray-700 font-bold' : ''}`
            }
          >
            <FaPoll />
            Result
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default SideNav;
