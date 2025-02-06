import React from "react"
import type { UseFormRegister, FieldError } from "react-hook-form"

type TextAreaFieldProps = {
  label: string
  name: string
  register: UseFormRegister<any>
  required?: boolean
  error?: FieldError
  placeholder?: string
  disabled?: boolean
  rows?: number
  maxLength?: number
  classname:string
}

function TextAreaField({
  label,
  name,
  register,
  required = false,
  error,
  placeholder = "",
  disabled = false,
  rows = 4,
  maxLength,
  classname
}: TextAreaFieldProps) {
  return (
    <div className={`flex flex-col ${classname}`}>
      <label htmlFor={name} className="mb-1 text-sm font-medium text-gray-700">
        {label}
      </label>
      <textarea
        id={name}
        {...register(name, { required, maxLength })}
        placeholder={placeholder}
        disabled={disabled}
        rows={rows}
        className={`px-3 py-2 border rounded-md bg-white resize-vertical min-h-[80px] ${
          disabled ? "bg-gray-100 cursor-not-allowed" : ""
        } ${error ? "border-red-500" : "border-gray-300"} 
        focus:outline-none focus:ring-1 ${error ? "focus:ring-red-500" : "focus:ring-blue-500"}`}
      />
      {error && (
        <p className="mt-1 text-xs text-red-500">
          {error.type === "maxLength"
            ? `${label} must be less than ${maxLength} characters`
            : error.message || `${label} is required`}
        </p>
      )}
    </div>
  )
}

export default TextAreaField