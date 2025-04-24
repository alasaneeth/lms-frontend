import React from 'react';
import { useForm } from 'react-hook-form';
import { STATUS } from '../../Constants/Status';
import { GENDER } from '../../Constants/Gender';
import StudentService from '../../../services/StudentService/Student.service';
import { USER_ROLE } from '../../Constants/UserRoles';

type FormData = {
  fullName: string;
  gender: string;
  dob: string;
  phone: string;
  email: string;
  address: string;
  studentId: string;
  status: string;
  enrolmentDate: string;
  widthrowelDate: string;
  username: string;
  password: string;
  userRole:number;
};

const AddStudent = ({ onClose }: { onClose: () => void }) => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues:{
      userRole:USER_ROLE.STUDENT,
    }
  });

  const onSubmit = async (data: FormData) => {
    console.log("Form submitted:", data)

    const response = await StudentService.create(data);
    console.log(response);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full z-50 flex justify-center items-center bg-black/50 backdrop-blur-sm overflow-y-auto">
      <div className="relative p-4 w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-lg shadow-lg">
        <div className='flex justify-end'>
          <button
            onClick={() => onClose()}>
            X
          </button>
        </div>

        <h2 className="text-2xl font-bold mb-4">STUDENT REGISTRATION FORM</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <div className="flex-1">
              <label className="block mb-1 font-medium">Student ID</label>
              <input
                {...register("studentId", { required: "student Id is required" })}
                className="w-full border rounded-xl px-3 py-2"
              />
              {errors.studentId && <p className="text-red-500">{errors.studentId.message}</p>}
            </div>
            <div className="flex-1">
              <label className="block mb-1 font-medium">Full Name</label>
              <input
                {...register("fullName", { required: "Full name is required" })}
                className="w-full border rounded-xl px-3 py-2"
              />
              {errors.fullName && <p className="text-red-500">{errors.fullName.message}</p>}
            </div>


          </div>
          <div className="flex flex-wrap gap-2">
            <div className="flex-1">
              <label className="block mb-1 font-medium">Gender</label>
              <select
                {...register("gender", { required: "Gender is required" })}
                className="w-full border rounded-xl px-3 py-2"
              >
                <option value="">Select gender</option>
                <option value={GENDER.MALE}>Male</option>
                <option value={GENDER.FEMALE}>Female</option>
                <option value={GENDER.OTHER}>Other</option>
              </select>
              {errors.gender && <p className="text-red-500">{errors.gender.message}</p>}
            </div>
            <div className="flex-1">
              <label className="block mb-1 font-medium">Date of Birth</label>
              <input
                type="date"
                {...register("dob", { required: "Date of birth is required" })}
                className="w-full border rounded-xl px-3 py-2"
              />
              {errors.dob && <p className="text-red-500">{errors.dob.message}</p>}
            </div>

          </div>

          <div className="flex flex-wrap gap-2">
            <div className="flex-1">
              <label className="block mb-1 font-medium">Status</label>
              <select
                {...register("status", { required: "Status is required" })}
                className="w-full border rounded-xl px-3 py-2"
              >
                <option value="">Select status</option>
                <option value={STATUS.ACTIVE}>Active</option>
                <option value={STATUS.INACTIVE}>Inactive</option>
                <option value={STATUS.DROP_OUT}>Drop Out</option>
                <option value={STATUS.SUSSPENDED}>SUSSPENDED</option>
                <option value={STATUS.TERMINATED}>TERMINATED</option>
              </select>
              {errors.status && <p className="text-red-500">{errors.status.message}</p>}
            </div>
            <div className="flex-1">
              <label className="block mb-1 font-medium">Phone</label>
              <input
                type="tel"
                {...register("phone", { required: "Phone number is required" })}
                className="w-full border rounded-xl px-3 py-2"
              />
              {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
            </div>



          </div>
          <div className="flex flex-wrap gap-2">
            <div className="flex-1">
              <label className="block mb-1 font-medium">Address</label>
              <input
                {...register("address", { required: "Address is required" })}
                className="w-full border rounded-xl px-3 py-2"
              />
              {errors.fullName && <p className="text-red-500">{errors.fullName.message}</p>}
            </div>
            <div className="flex-1">
              <label className="block mb-1 font-medium">Email</label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                className="w-full border rounded-xl px-3 py-2"
              />
              {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            </div>

          </div>
          <div className="flex flex-wrap gap-2">
            <div className="flex-1">
              <label className="block mb-1 font-medium">Enrolment Date</label>
              <input
                type="date"
                {...register("enrolmentDate", { required: "Enrolment date is required" })}
                className="w-full border rounded-xl px-3 py-2"
              />
              {errors.enrolmentDate && <p className="text-red-500">{errors.enrolmentDate.message}</p>}
            </div>
            <div className="flex-1">
              <label className="block mb-1 font-medium">widthrowel Date</label>
              <input
                type="date"
                 {...register("widthrowelDate")}
                className="w-full border rounded-xl px-3 py-2"
              />
              {/* {errors.widthrowelDate && <p className="text-red-500">{errors.widthrowelDate.message}</p>} */}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <div className="flex-1">
              <label className="block mb-1 font-medium">Username</label>
              <input
                {...register("username", { required: "username date is required" })}
                className="w-full border rounded-xl px-3 py-2"
              />
              
              {errors.username && <p className="text-red-500">{errors.username.message}</p>}
            </div>
            <div className="flex-1">
              <label className="block mb-1 font-medium">Password</label>
              <input
                {...register("password", { required: "password date is required" })}
                className="w-full border rounded-xl px-3 py-2"
              />
              {errors.password && <p className="text-red-500">{errors.password.message}</p>}
            </div>
          </div>

          <div className='flex justify-end'>

            <button
              type="submit"
              className=" bg-blue-600 text-white font-semibold py-2 px-4 rounded-xl hover:bg-blue-700"
            >
              Submit
            </button>
          </div>


        </form>

      </div>
    </div>
  );
};

export default AddStudent;
