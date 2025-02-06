import React from "react";
import type { UseFormRegister, FieldError } from "react-hook-form";

type SelectFieldProps = {
  label: string;
  name: string;
  options: { label: string; value: string }[];
  register: UseFormRegister<any>;
  required?: boolean;
  error?: FieldError;
  placeholder?: string;
  disabled?: boolean;
  classname:string
};

function SelectField({
  label,
  name,
  options,
  register,
  required = false,
  error,
  placeholder = "Select an option",
  disabled = false,
  classname
}: SelectFieldProps) {
  return (
    <div className={`flex flex-col ${classname} `}>
      <label htmlFor={name} className="mb-1 text-sm font-medium text-gray-700">
        {label}
      </label>
      <select
        id={name}
        {...register(name, { required })}
        // disabled={disabled}
        className={`px-3 py-2 border rounded-md bg-white ${
          disabled ? "bg-gray-100 cursor-not-allowed" : ""
        } ${error ? "border-red-500" : "border-gray-300"} 
        focus:outline-none focus:ring-1 ${
          error ? "focus:ring-red-500" : "focus:ring-blue-500"
        }`}
      >
        <option value="">{placeholder}</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1 text-xs text-red-500">
          {error.message || `${label} is required`}
        </p>
      )}
    </div>
  );
}

export default SelectField;
