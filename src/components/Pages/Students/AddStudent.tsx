import React from 'react'

const AddStudent = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full z-50 flex justify-center items-center bg-black/50 backdrop-blur-sm">
      <div className="relative p-4 w-full max-w-md bg-white rounded-lg shadow-lg">
        <div className="flex justify-between items-center border-b pb-3">
          <h3 className="text-lg font-semibold text-gray-900">Add Student</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-900"
          >
            ✕
          </button>
        </div>
        <form className="mt-4">
          {/* your form fields here */}
        </form>
      </div>
    </div>
  );
};


export default AddStudent