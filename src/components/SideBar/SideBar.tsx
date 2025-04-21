import React, { useState, useMemo, lazy, Suspense } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBars, FaChalkboardTeacher, FaPoll, FaTimes, FaUserGraduate } from 'react-icons/fa';
import { USER_ROLE } from '../Constants/UserRoles';

// Lazy-loaded icons
// const FaUserGraduate = lazy(() => import('react-icons/fa').then(mod => ({ default: mod.FaUserGraduate })));
// const FaChalkboardTeacher = lazy(() => import('react-icons/fa').then(mod => ({ default: mod.FaChalkboardTeacher })));
// const FaPoll = lazy(() => import('react-icons/fa').then(mod => ({ default: mod.FaPoll })));

const getNavItemsByRole = (roleId: number) => {
  switch (roleId) {
    case USER_ROLE.ADMIN:
      return [
        { to: '/student', label: 'Student', icon: <FaUserGraduate /> },
        { to: '/tutors', label: 'Tutors', icon: <FaChalkboardTeacher /> },
        { to: '/result', label: 'Result', icon: <FaPoll /> },
      ];
    case USER_ROLE.TUTOR:
      return [
        { to: '/student', label: 'Student', icon: <FaUserGraduate /> },
        { to: '/result', label: 'Result', icon: <FaPoll /> },
      ];
    case USER_ROLE.STUDENT:
      return [
        { to: '/result', label: 'Result', icon: <FaPoll /> },
      ];
    default:
      return [];
  }
};

const SideNav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  const roleId = useMemo(() => {
    return parseInt(localStorage.getItem('userRole') || '', 10);
  }, []);

  const navItems = useMemo(() => getNavItemsByRole(roleId), [roleId]);

  return (
    <>
      <div className="md:hidden bg-gray-800 text-white flex justify-between items-center p-4">
        <button onClick={toggleSidebar}>
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={closeSidebar}
        ></div>
      )}

      <nav
        className={`fixed top-0 left-0 h-screen bg-gray-800 text-white w-64 p-4 transform transition-transform duration-300 ease-in-out z-50
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:relative md:flex md:flex-col`}
      >
        <button className="md:hidden mb-4 text-white" onClick={closeSidebar}>
          <FaTimes size={24} />
        </button>

        <div className="mb-6 flex justify-center">
          <img
            src="/path-to-your-logo.png"
            alt="Organization Logo"
            className="h-16 object-contain"
          />
        </div>

        <Suspense fallback={<div className="text-center text-gray-400">Loading Menu...</div>}>
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
        </Suspense>
      </nav>
    </>
  );
};

export default SideNav;
