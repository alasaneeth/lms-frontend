import React from 'react';
import StudentService from '../../../services/StudentService/Student.service';
import { handleGender, handleStatus } from '../../ReuableFunctions/SwitchBaedFunctions';
import AddStudent from './AddStudent';
import ViewStudents from './ViewStudents';
import { FaPencilAlt } from 'react-icons/fa';
import { BiSolidShow } from 'react-icons/bi';
import GridViewTable from '../../TableComponents/Table/GridViewTable';

const Students = () => {
  const columns = [
    { key: 'studentId', label: 'Student ID' },
    { key: 'fullName', label: 'Name' },
    { key: 'gender', label: 'Gender', render: (row: any) => handleGender(row.gender) },
    { key: 'dob', label: 'DOB' },
    { key: 'phone', label: 'Phone' },
    { key: 'status', label: 'Status', render: (row: any) => handleStatus(row.status) },
  ];

  const actions = (row: any, setId: any, openAdd: any, openView: any) => (
    <div className="flex gap-2">
      <button
        onClick={() => {
          setId(row.id);
          openAdd();
        }}
      >
        <FaPencilAlt size={18} />
      </button>
      <button
        onClick={() => {
          setId(row.id);
          openView();
        }}
      >
        <BiSolidShow size={22} />
      </button>
    </div>
  );

  return (
    <GridViewTable
      title="Students"
      columns={columns}
      fetchData={StudentService.getAll}
      searchFunction={StudentService.search}
      AddComponent={AddStudent}
      ViewComponent={ViewStudents}
      actions={actions}
    />
  );
};

export default Students;
