import React, { useEffect, useState } from 'react';
import StudentService from '../../../services/StudentService/Student.service';
import { handleGender, handleStatus } from '../../ReuableFunctions/SwitchBaedFunctions';
import AddStudent from './AddStudent';
import { FaPencilAlt } from 'react-icons/fa';
import { BiSolidShow } from "react-icons/bi";
import ViewStudents from './ViewStudents';

const Students = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(6);
  const [showModel, setShowModel] = useState(false);
  const [viewShow, setViewShow] = useState(false);
  const [id, setId] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  const fetchStudent = async () => {
    const res = await StudentService.getAll();
    setData(res);
  };

  useEffect(() => {
    fetchStudent();
  }, []);

  const handleSearch = async () => {
    const res = await StudentService.search(searchValue);
    setData(res);
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(data.length / rowsPerPage); i++) {
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
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
        <button
          onClick={() => setShowModel(true)}
          className="w-full md:w-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Add Student
        </button>

        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search here"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={(e: any) => {
              if (e.key === "Enter") handleSearch();
            }}
            className="border border-gray-300 rounded-3xl px-4 py-2 w-full sm:w-auto"
          />
          <button
            className="bg-red-400 text-white px-4 py-2 rounded-2xl text-sm hover:bg-gray-500"
            onClick={() => {
              setSearchValue("");
              fetchStudent();
            }}
          >
            Reset
          </button>
        </div>
      </div>

      {showModel && <AddStudent onClose={() => setShowModel(false)} onStudentCreated={fetchStudent} id={id} setId={setId} />}
      {viewShow && <ViewStudents onClose={() => setViewShow(false)} id={id} />}

      <div className="overflow-x-auto bg-white text-black rounded-lg shadow-sm">
        <table className="w-full text-sm text-left text-black min-w-[600px]">
          <thead className="text-xs text-black uppercase bg-gray-100">
            <tr>
              <th className="px-2 py-1">#</th>
              <th className="px-4 py-3">Student ID</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Gender</th>
              <th className="px-4 py-3">DOB</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((row: any, index: number) => (
              <tr key={index} className="bg-white border-b border-gray-200">
                <td className="px-2 py-2">{index + 1}.</td>
                <td className="px-4 py-2">{row.studentId}</td>
                <td className="px-4 py-2">{row.fullName}</td>
                <td className="px-4 py-2">{handleGender(row.gender)}</td>
                <td className="px-4 py-2">{row.dob}</td>
                <td className="px-4 py-2">{row.phone}</td>
                <td className="px-4 py-2">{handleStatus(row.status)}</td>
                <td className="px-4 py-2">
                  <div className="flex gap-2">
                    <button onClick={() => { setShowModel(true); setId(row.id); }}>
                      <FaPencilAlt size={18} />
                    </button>
                    <button onClick={() => { setId(row.id); setViewShow(true); }}>
                      <BiSolidShow size={22} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center bg-white mt-4">
        <nav>
          <ul className="inline-flex -space-x-px text-base h-10">
            <li>
              <button
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                className="px-4 h-10 text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100"
              >
                Previous
              </button>
            </li>
            {pageNumbers.map((number) => (
              <li key={number}>
                <button
                  onClick={() => paginate(number)}
                  className={`px-4 h-10 border border-gray-300 hover:bg-gray-100 ${currentPage === number
                    ? 'text-blue-600 bg-blue-100 font-semibold border-blue-300'
                    : 'text-gray-500 bg-white'
                    }`}
                >
                  {number}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={goToNextPage}
                disabled={currentPage === pageNumbers.length}
                className="px-4 h-10 text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100"
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
