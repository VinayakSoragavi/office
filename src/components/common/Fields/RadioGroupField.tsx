import React from "react";
import type { UseFormRegister, FieldError } from "react-hook-form";

type RadioGroupProps = {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  required?: boolean;
  error?: FieldError;
  classname: string;
  displayOrder: number;
};

function RadioGroupField({
  label,
  name,
  register,
  required = false,
  error,
  classname,
  displayOrder,
}: RadioGroupProps) {
  return (
    <div className={`flex flex-col ${classname}`} style={{ order: displayOrder }}>
      <div className="flex items-center gap-1">
        <label htmlFor={name} className="text-sm font-medium text-gray-700">
          {label}
        </label>
        {required && <span className="text-destructive">*</span>}
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center space-x-2">
          <input
            type="radio"
            id={`${name}-days`}
            value="days"
            {...register(name, { required })}
            // className="hidden"
          />
          <label
            htmlFor={`${name}-days`}
            className={`text-sm text-muted-foreground ${error ? "text-red-500" : ""}`}
          >
            Days
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="radio"
            id={`${name}-hours`}
            value="hours"
            {...register(name, { required })}
            // className="hidden"
          />
          <label
            htmlFor={`${name}-hours`}
            className={`text-sm text-muted-foreground ${error ? "text-red-500" : ""}`}
          >
            Hours
          </label>
        </div>
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error.message || `${label} is required`}</p>}
    </div>
  );
}

export default RadioGroupField;
