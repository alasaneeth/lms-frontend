import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaUserGraduate, FaChalkboardTeacher, FaPoll, FaBars, FaTimes } from 'react-icons/fa';

const navItems = [
  { to: '/student', label: 'Student', icon: <FaUserGraduate /> },
  { to: '/tutors', label: 'Tutors', icon: <FaChalkboardTeacher /> },
  { to: '/result', label: 'Result', icon: <FaPoll /> },
  
];

const SideNav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      {/* Top bar for mobile */}
      <div className="md:hidden bg-gray-800 text-white flex justify-between items-center p-4">
        <button onClick={toggleSidebar}>
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={closeSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <nav
        className={`fixed top-0 left-0 h-screen bg-gray-800 text-white w-64 p-4 transform transition-transform duration-300 ease-in-out z-50
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:relative md:flex md:flex-col`}
      >
        {/* Close button for mobile */}
        <button className="md:hidden mb-4 text-white" onClick={closeSidebar}>
          <FaTimes size={24} />
        </button>

        {/* Logo */}
        <div className="mb-6 flex justify-center">
          <img
            src="/path-to-your-logo.png"
            alt="Organization Logo"
            className="h-16 object-contain"
          />
        </div>

        {/* Dynamic Navigation Links */}
        <ul>
          {navItems.map((item, index) => (
            <li key={index} className="mb-4">
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-2 p-2 rounded hover:bg-gray-700 ${
                    isActive ? 'bg-gray-700 font-bold' : ''
                  }`
                }
                onClick={closeSidebar}
              >
                {item.icon}
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default SideNav;
