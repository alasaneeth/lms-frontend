import { FaChalkboardTeacher, FaPoll, FaUserGraduate } from 'react-icons/fa';
import { USER_ROLE } from '../Constants/UserRoles';

export const getNavItemsByRole = (roleId: number) => {
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
