import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { STATUS } from '../../Constants/Status';
import { GENDER } from '../../Constants/Gender';
import StudentService from '../../../services/StudentService/Student.service';
import { USER_ROLE } from '../../Constants/UserRoles';
import toast from 'react-hot-toast';

type FormData = {
  fullName: string;
  gender: number;
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
  userRole: number;
  confirmPassword: string;
};

type AddStudentProps = {
  onClose: () => void;
  onCreated: () => void;
  id?: any;
  setId?: (id: any) => void;
};

const AddStudent: React.FC<AddStudentProps> = ({ onClose, onCreated, id, setId }) => {
  const [initValue, setInitValue] = useState<FormData | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  useEffect(() => {
    const fetchStudentById = async () => {
      const res = await StudentService.get(id);
      setInitValue(res);
      reset(res);
    };

    if (id) {
      fetchStudentById();
    } else {
      const defaultData: FormData = {
        fullName: '',
        gender: 0,
        dob: '',
        phone: '',
        email: '',
        address: '',
        studentId: '',
        status: '',
        enrolmentDate: '',
        widthrowelDate: '',
        username: '',
        password: '',
        userRole: USER_ROLE.STUDENT,
        confirmPassword: '',
      };
      setInitValue(defaultData);
      reset(defaultData);
    }
  }, [id, reset]);

  const onSubmit = async (data: FormData) => {
    if (id) {
      await StudentService.edit(data, id);
      setId?.(null);
      toast.success('Student updated successfully');
    } else {
      if (data.password !== data.confirmPassword) {
        toast.error('Please check password');
        return;
      }
      await StudentService.create(data);
      setId?.(null);
      toast.success('Student created successfully');
    }

    onCreated();
    onClose();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full z-50 flex justify-center items-center bg-black/50 backdrop-blur-sm overflow-y-auto">
      <div className="relative p-2 w-full max-w-xs md:max-w-md lg:max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-lg shadow-lg">
        <div className="flex justify-end">
          <button
            onClick={() => {
              setId?.(null);
              onClose();
            }}
            className="text-lg font-bold"
          >
            X
          </button>
        </div>

        <h2 className="text-lg md:text-xl font-bold mb-2 text-center">
          STUDENT REGISTRATION FORM
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
          {/* Student ID & Full Name */}
          <div className="flex flex-col gap-2 md:flex-row">
            <div className="flex-1">
              <label className="block mb-1 font-medium text-xs md:text-sm">Student ID</label>
              <input
                {...register('studentId', { required: 'Student Id is required' })}
                className="w-full border rounded-xl px-2 py-1 text-xs md:text-sm"
              />
              {errors.studentId && <p className="text-red-500 text-xs">{errors.studentId.message}</p>}
            </div>
            <div className="flex-1">
              <label className="block mb-1 font-medium text-xs md:text-sm">Full Name</label>
              <input
                {...register('fullName', { required: 'Full name is required' })}
                className="w-full border rounded-xl px-2 py-1 text-xs md:text-sm"
              />
              {errors.fullName && <p className="text-red-500 text-xs">{errors.fullName.message}</p>}
            </div>
          </div>

          {/* Gender & DOB */}
          <div className="flex flex-col gap-2 md:flex-row">
            <div className="flex-1">
              <label className="block mb-1 font-medium text-xs md:text-sm">Gender</label>
              <select
                {...register('gender', { required: 'Gender is required' })}
                className="w-full border rounded-xl px-2 py-1 text-xs md:text-sm"
              >
                <option value="">Select gender</option>
                <option value={GENDER.MALE}>Male</option>
                <option value={GENDER.FEMALE}>Female</option>
                <option value={GENDER.OTHER}>Other</option>
              </select>
              {errors.gender && <p className="text-red-500 text-xs">{errors.gender.message}</p>}
            </div>
            <div className="flex-1">
              <label className="block mb-1 font-medium text-xs md:text-sm">Date of Birth</label>
              <input
                type="date"
                {...register('dob', { required: 'Date of birth is required' })}
                className="w-full border rounded-xl px-2 py-1 text-xs md:text-sm"
              />
              {errors.dob && <p className="text-red-500 text-xs">{errors.dob.message}</p>}
            </div>
          </div>

          {/* Status & Phone */}
          <div className="flex flex-col gap-2 md:flex-row">
            <div className="flex-1">
              <label className="block mb-1 font-medium text-xs md:text-sm">Status</label>
              <select
                {...register('status', { required: 'Status is required' })}
                className="w-full border rounded-xl px-2 py-1 text-xs md:text-sm"
              >
                <option value="">Select status</option>
                <option value={STATUS.ACTIVE}>Active</option>
                <option value={STATUS.INACTIVE}>Inactive</option>
                <option value={STATUS.DROP_OUT}>Drop Out</option>
                <option value={STATUS.SUSSPENDED}>Suspended</option>
                <option value={STATUS.TERMINATED}>Terminated</option>
              </select>
              {errors.status && <p className="text-red-500 text-xs">{errors.status.message}</p>}
            </div>
            <div className="flex-1">
              <label className="block mb-1 font-medium text-xs md:text-sm">Phone</label>
              <input
                type="tel"
                {...register('phone', { required: 'Phone number is required' })}
                className="w-full border rounded-xl px-2 py-1 text-xs md:text-sm"
              />
              {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message}</p>}
            </div>
          </div>

          {/* Address & Email */}
          <div className="flex flex-col gap-2 md:flex-row">
            <div className="flex-1">
              <label className="block mb-1 font-medium text-xs md:text-sm">Address</label>
              <input
                {...register('address', { required: 'Address is required' })}
                className="w-full border rounded-xl px-2 py-1 text-xs md:text-sm"
              />
              {errors.address && <p className="text-red-500 text-xs">{errors.address.message}</p>}
            </div>
            <div className="flex-1">
              <label className="block mb-1 font-medium text-xs md:text-sm">Email</label>
              <input
                type="email"
                {...register('email', { required: 'Email is required' })}
                className="w-full border rounded-xl px-2 py-1 text-xs md:text-sm"
              />
              {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
            </div>
          </div>

          {/* Enrolment & Withdrawal Dates */}
          <div className="flex flex-col gap-2 md:flex-row">
            <div className="flex-1">
              <label className="block mb-1 font-medium text-xs md:text-sm">Enrolment Date</label>
              <input
                type="date"
                {...register('enrolmentDate', { required: 'Enrolment date is required' })}
                className="w-full border rounded-xl px-2 py-1 text-xs md:text-sm"
              />
              {errors.enrolmentDate && <p className="text-red-500 text-xs">{errors.enrolmentDate.message}</p>}
            </div>
            <div className="flex-1">
              <label className="block mb-1 font-medium text-xs md:text-sm">Withdrawal Date</label>
              <input
                type="date"
                {...register('widthrowelDate')}
                className="w-full border rounded-xl px-2 py-1 text-xs md:text-sm"
              />
            </div>
          </div>

          {/* Username & Passwords (Only on Create) */}
          {!id && (
            <div className="flex flex-col gap-2 md:flex-row">
              <div className="flex-1">
                <label className="block mb-1 font-medium text-xs md:text-sm">Username</label>
                <input
                  {...register('username', { required: 'Username is required' })}
                  className="w-full border rounded-xl px-2 py-1 text-xs md:text-sm"
                />
                {errors.username && <p className="text-red-500 text-xs">{errors.username.message}</p>}
              </div>
              <div className="flex-1">
                <label className="block mb-1 font-medium text-xs md:text-sm">Password</label>
                <input
                  {...register('password', { required: 'Password is required' })}
                  className="w-full border rounded-xl px-2 py-1 text-xs md:text-sm"
                />
                {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
              </div>
              <div className="flex-1">
                <label className="block mb-1 font-medium text-xs md:text-sm">Confirm Password</label>
                <input
                  {...register('confirmPassword', { required: 'Confirm Password is required' })}
                  className="w-full border rounded-xl px-2 py-1 text-xs md:text-sm"
                />
                {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword.message}</p>}
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-center md:justify-end mt-2">
            <button
              type="submit"
              className="bg-blue-600 text-white font-semibold py-1 px-3 rounded-xl hover:bg-blue-700 w-full md:w-auto text-xs md:text-sm"
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
