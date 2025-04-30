import React, { useEffect, useState } from 'react';
import StudentService from '../../../services/StudentService/Student.service';
import { handleGender, handleStatus } from '../../ReuableFunctions/SwitchBaedFunctions';
import AddStudent from './AddStudent';
import { FaPencilAlt } from 'react-icons/fa';
import { BiSolidShow } from "react-icons/bi";
import { IoMdArchive } from "react-icons/io";
import ViewStudents from './ViewStudents';

const Students = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(6);
  const [showModel, setShowModel] = useState(false)
  const [editShow, setEditShow] = useState(false)
  const [viewShow, setViewShow] = useState(false);
  const [id, setId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchStudent = async () => {
    const res = await StudentService.getAll();
    setData(res);
    setFilteredData(res);
  };

  useEffect(() => {
    fetchStudent();
  }, []);

  const handleSearch = () => {
    const query = searchQuery.toLowerCase();
    const filtered = data.filter((student: any) =>
      student.fullName.toLowerCase().includes(query) ||
      student.studentId.toLowerCase().includes(query)
    );
    setFilteredData(filtered);
    setCurrentPage(1); // Reset to first page on search
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredData.length / rowsPerPage); i++) {
    pageNumbers.push(i);
  }

  const goToNextPage = () => {
    if (currentPage < pageNumbers.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <h5 className="text-xl font-bold uppercase mb-4">Student</h5>

      {/* Search Bar */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Search by Name or ID"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 rounded-3xl px-4 py-2 w-64"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>

      <button
        onClick={() => setShowModel(true)}
        className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mb-4"
        type="button"
      >
        Add Student
      </button>

      {showModel && <AddStudent onClose={() => setShowModel(false)} onStudentCreated={fetchStudent} id={id} setId={setId} />}
      {viewShow && <ViewStudents onClose={() => setViewShow(false)} id={id} />}
      
      <div className="relative overflow-x-auto bg-white text-black">
        <table className="w-full text-sm text-left text-black">
          <thead className="text-xs text-black uppercase bg-gray-100">
            <tr>
              <th className="px-1 py-1">#</th>
              <th className="px-6 py-3">STUDENT ID</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Gender</th>
              <th className="px-6 py-3">DOB</th>
              <th className="px-6 py-3">Phone</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((row: any, index: number) => (
              <tr key={index} className="bg-white border-b border-gray-300">
                <td className="px-1 py-1">{index + 1}.</td>
                <td className="px-6 py-4">{row.studentId}</td>
                <td className="px-6 py-4">{row.fullName}</td>
                <td className="px-6 py-4">{handleGender(row.gender)}</td>
                <td className="px-6 py-4">{row.dob}</td>
                <td className="px-6 py-4">{row.phone}</td>
                <td className="px-6 py-4">{handleStatus(row.status)}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-3">
                    <button className="cursor-pointer" onClick={() => {
                      setShowModel(true);
                      setId(row.id);
                    }}>
                      <FaPencilAlt size={20} />
                    </button>
                    <button className="cursor-pointer" onClick={() => {
                      setId(row.id);
                      setViewShow(true);
                    }}>
                      <BiSolidShow size={25} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center bg-white mt-4">
        <nav aria-label="Page navigation">
          <ul className="inline-flex -space-x-px text-base h-10">
            <li>
              <button
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                className="px-4 h-10 rounded-s-lg border border-gray-300 bg-white text-gray-500 hover:bg-gray-100"
              >
                Previous
              </button>
            </li>
            {pageNumbers.map((number) => (
              <li key={number}>
                <button
                  onClick={() => paginate(number)}
                  className={`px-4 h-10 border border-gray-300 ${currentPage === number ? 'bg-blue-100 text-blue-600 font-semibold' : 'bg-white text-gray-500 hover:bg-gray-100'}`}
                >
                  {number}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={goToNextPage}
                disabled={currentPage === pageNumbers.length}
                className="px-4 h-10 rounded-e-lg border border-gray-300 bg-white text-gray-500 hover:bg-gray-100"
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Students;
