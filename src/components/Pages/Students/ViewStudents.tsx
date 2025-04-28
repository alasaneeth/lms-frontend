import React, { useEffect, useState } from 'react';
import StudentService from '../../../services/StudentService/Student.service';
import image from "../../../assets/images.jpeg"

const ViewStudents = ({ onClose, id }: { onClose: () => void, id: any | null }) => {

    interface Student {
        studentId: string;
        fullName: string;
        gender: string;
        dob: string;
        phone: string;
        email: string;
        address: string;
        status: string;
        enrolmentDate: string;
        widthrowelDate: string;
    }


    const [data, setData] = useState<Student | null>(null);

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

                    {data && (
                        <div className="p-4 space-y-2">
                            <dl className="grid grid-cols-2 gap-x-4 gap-y-2">
                                <div>
                                    <dt className="font-semibold">Student ID:</dt>
                                    <dd>{data.studentId}</dd>
                                </div>
                                <div>
                                    <dt className="font-semibold">Name:</dt>
                                    <dd>{data.fullName}</dd>
                                </div>
                                <div>
                                    <dt className="font-semibold">Gender:</dt>
                                    <dd>{data.gender}</dd>
                                </div>
                                <div>
                                    <dt className="font-semibold">DOB:</dt>
                                    <dd>{data.dob}</dd>
                                </div>
                                <div>
                                    <dt className="font-semibold">Contact No:</dt>
                                    <dd>{data.phone}</dd>
                                </div>
                                <div>
                                    <dt className="font-semibold">Email:</dt>
                                    <dd>{data.email}</dd>
                                </div>
                                <div>
                                    <dt className="font-semibold">Address:</dt>
                                    <dd>{data.address}</dd>
                                </div>
                                <div>
                                    <dt className="font-semibold">Status:</dt>
                                    <dd>{data.status}</dd>
                                </div>
                                <div>
                                    <dt className="font-semibold">Enrolment Date:</dt>
                                    <dd>{data.enrolmentDate}</dd>
                                </div>
                                <div>
                                    <dt className="font-semibold">Withdrawal Date:</dt>
                                    <dd>{data.widthrowelDate}</dd>
                                </div>
                            </dl>
                        </div>
                    )}


                    <div className="p-4">
                        <img src={image} alt="Description" className="w-full h-auto rounded-lg shadow-md" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewStudents;
