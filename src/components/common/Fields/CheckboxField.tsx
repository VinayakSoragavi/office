import React from "react";
import type { UseFormRegister, FieldError } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

type CheckboxFieldProps = {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  required?: boolean;
  error?: FieldError;
  classname: string;
  displayOrder: number;
};

function CheckboxField({
  label,
  name,
  register,
  required = false,
  error,
  classname,
  displayOrder,
}: CheckboxFieldProps) {
  return (
    <div className={`flex flex-col ${classname}`} style={{ order: displayOrder }}>
      <div className="flex items-center gap-1">
        <Label htmlFor={name} className="text-sm font-medium text-gray-700">
          {label}
        </Label>
        {required && <span className="text-destructive">*</span>}
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id={name}
          {...register(name, { required })}
          className="h-[18px] w-[18px] rounded-[4px] border-gray-200 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
        />
        <Label
          htmlFor={name}
          className="text-sm font-normal text-gray-600 select-none cursor-pointer"
        >
          {label}
        </Label>
      </div>
      {error && (
        <p className="mt-1 text-xs text-red-500">
          {error.message || `${label} is required`}
        </p>
      )}
    </div>
  );
}

export default CheckboxField;
