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
  const [currentPage, setCurrentPage] = useState(1);  // Tracks the current page
  const [rowsPerPage] = useState(6);  // Number of rows to display per page
  const [showModel, setShowModel] = useState(false)
  const [editShow, setEditShow] = useState(false)
  const [viewShow, setViewShow] = useState(false);
  const [id, setId] = useState(null);

  const fetchStudent = async () => {
    const res = await StudentService.getAll();
    setData(res);
  };

  useEffect(() => {
    fetchStudent();
  }, []);

  // Calculate the index of the first and last rows for the current page
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;

  // Get the current rows for the current page
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

  // Handle page change
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Calculate the total number of pages
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(data.length / rowsPerPage); i++) {
    pageNumbers.push(i);
  }

  // Handle previous and next page navigation
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
      <button
        onClick={() => setShowModel(true)}
        data-modal-target="crud-modal"
        data-modal-toggle="crud-modal"
        className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mb-4"
        type="button"
      >
        Add Student
      </button>

      {showModel && <AddStudent onClose={() => setShowModel(false)} onStudentCreated={fetchStudent} id={id} />}
      {viewShow && <ViewStudents onClose={() => setViewShow(false)} id={id} />}
      <div className="relative overflow-x-auto bg-white text-black">
        <table className="w-full text-sm text-left text-black">
          <thead className="text-xs text-black uppercase bg-gray-100">
            <tr>
              <th scope="col" className="px-6 py-3">STUDENT ID</th>
              <th scope="col" className="px-6 py-3">Name</th>
              <th scope="col" className="px-6 py-3">Gender</th>
              <th scope="col" className="px-6 py-3">DOB</th>
              <th scope="col" className="px-6 py-3">Phone</th>
              <th scope="col" className="px-6 py-3">Status</th>
              <th scope="col" className='px-6 py-3'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((row: any, index: number) => (
              <tr key={index} className="bg-white border-b border-gray-300">
                <td className="px-6 py-4">{row.studentId}</td>
                <td className="px-6 py-4">{row.fullName}</td>
                <td className="px-6 py-4">{handleGender(row.gender)}</td>
                <td className="px-6 py-4">{row.dob}</td>
                <td className="px-6 py-4">{row.phone}</td>
                <td className="px-6 py-4">{handleStatus(row.status)}</td>
                <td className='px-6 py-4' >
                  <div className="flex gap-3">
                    <button className="cursor-pointer" onClick={() => {
                      setShowModel(true)
                      setId(row.id)
                    }}><FaPencilAlt size={20} />
                    </button>
                    <button className="cursor-pointer" onClick={() => {
                      setId(row.id);         // set id first
                      setViewShow(true);     // then show the view popup
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
        <nav aria-label="Page navigation example">
          <ul className="inline-flex -space-x-px text-base h-10">
            <li>
              <button
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700"
              >
                Previous
              </button>
            </li>
            {pageNumbers.map((number) => (
              <li key={number}>
                <button
                  onClick={() => paginate(number)}
                  className={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ${currentPage === number
                    ? 'text-blue-600 border-blue-300 bg-blue-100 font-semibold'
                    : ''
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
                className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700"
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
