import React from "react";

const FormInput = ({ label, name, register, rules, errors, type = "text" }) => {
  return (
    <div className="flex-1">
      <label className="block mb-1 font-medium text-xs md:text-sm">{label}</label>
      <input
        type={type}
        {...register(name, rules)}
        className="w-full border rounded-xl px-2 py-1 text-xs md:text-sm"
      />
      {errors?.[name] && (
        <p className="text-red-500 text-xs">{errors[name]?.message}</p>
      )}
    </div>
  );
};

export default FormInput;
