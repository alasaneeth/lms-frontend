import React, { useEffect, useState } from 'react';
import StudentService from '../../../services/StudentService/Student.service';
import image from "../../../assets/images.jpeg"

const ViewStudents = ({ onClose, id }: { onClose: () => void, id: any | null }) => {

    const [data, setData] = useState({});

    useEffect(() => {
        const fetchStudentById = async () => {
            const res = await StudentService.get(id);
            setData(res)
        }
        fetchStudentById();
    }, [id])

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
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-4">Column 1</div>
                    <div className="p-4">
                        <img src={image} alt="Description" className="w-full h-auto rounded-lg shadow-md" />

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewStudents;
