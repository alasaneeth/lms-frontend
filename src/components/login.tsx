import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Auth from '../services/AuthService/Auth';
import { useNavigate } from 'react-router-dom';

type LoginFormInputs = {
  username: string;
  password: string;
};

const LoginPage: React.FC = () => {

    const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      const { username, password } = data;
      const response = await Auth.login(username, password);
  
      // Redirect if login is successful
      if (response?.token) {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error("Login failed:", error);
      // Optionally show an error to the user here
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              className={`w-full px-4 py-2 border rounded-xl focus:outline-none ${
                errors.username ? 'border-red-500' : 'border-gray-300'
              }`}
              {...register('username', {
                required: 'Username is required',
              })}
            />
            {errors.username && (
              <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                className={`w-full px-4 py-2 border rounded-xl focus:outline-none ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                })}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-2 text-sm text-blue-600 hover:underline focus:outline-none"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
