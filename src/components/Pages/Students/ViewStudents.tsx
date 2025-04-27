import React from 'react';

const ViewStudents = ({ onClose, id }: { onClose: () => void, id: number | null }) => {
    return (
    <div className="fixed top-0 left-0 w-full h-full z-50 flex justify-center items-center bg-black/50 backdrop-blur-sm overflow-y-auto " >
         <div className="relative p-4 w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-lg shadow-lg">
           <div className='flex justify-end'>
             <button
               onClick={() => onClose()}>
               X
             </button>
           </div>
   
           <h2 className="text-2xl font-bold mb-4">STUDENT REGISTRATION FORM</h2>
         </div>
       </div>
  );
};

export default ViewStudents;
