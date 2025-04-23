import React from 'react';
import { useForm } from 'react-hook-form';

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
};

const AddStudent = ({ onClose }: { onClose: () => void }) => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full z-50 flex justify-center items-center bg-black/50 backdrop-blur-sm overflow-y-auto">
      <div className="relative p-4 w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Student Enrolment Form</h2>
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
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
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
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
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
                {...register("widthrowelDate", { required: "widthrowelDate date is required" })}
                className="w-full border rounded-xl px-3 py-2"
              />
              {errors.widthrowelDate && <p className="text-red-500">{errors.widthrowelDate.message}</p>}
            </div>
          </div>

          <div className='flex justify-end'>
            <button
              onClick={() => onClose()}
              className=" bg-red-600 text-white font-semibold mr-2 py-2 px-4 rounded-xl hover:bg-red-700"
            >
              Cancel
            </button>
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
