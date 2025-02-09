"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { Dispatch, SetStateAction } from "react"
import { Shape } from "@/types/shapes"

interface BasicInfoFormProps {
  setIsFormOpen: Dispatch<SetStateAction<string|null>>
  shape?:Shape
}

export default function BasicInfoForm({ setIsFormOpen,shape }: BasicInfoFormProps) {
  return (
    <div className="w-[280px] max-w-xl p-6 bg-[#303034] border-xl rounded-xl relative no-select z-20">
      {/* Cancel Button */}
      <Button 
        variant="ghost" 
        size="icon" 
        className="absolute right-2 top-2 text-gray-400 hover:text-white hover:bg-gray-700"
        onClick={() => {setIsFormOpen(null)}}
      >
        <X className="h-4 w-4" />
      </Button>

      <h1 className="text-md font-semibold text-[white] mb-2">Basic Info</h1>

      <div className="space-y-3">
        {/* First Name */}

{
  shape?.form.map((elem, index) => {
    return (
      <div key={index} className="space-y-0">
        <label className="text-sm text-white">{elem.title}</label>
        <Input
          type="text"
          placeholder={elem.value}
          className="border-0 border-b border-gray-200 rounded-none px-0 h-8 focus:border-gray-400 focus:ring-0 placeholder-gray-700 focus:outline-none"
          onChange={(e) => {
            if (elem) {
              shape.form = shape.form.map((j) => {
                if (j.title === elem.title) {
                  return {
                    ...j,
                    value: e.target.value
                  }
                }
                return j
              })
            }
          }}
        />
      </div>
    )
  })
}
        
        

        {/* Gender and Birth Date in a row */}
        {/* <div className="grid grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-sm text-gray-500">Im</label>
            <Select>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-500">Birth Date</label>
            <Select>
              <option>February</option>
            </Select>
          </div>
        </div> */}

        {/* Email */}
        

        {/* Submit Button */}
        <Button 
          className="w-full mt-6 bg-[#303034] border-2 border-[#3986eb] hover:bg-[#3986eb] text-white"
          onClick={() => {/* Add submit handler */}}
        >
          Submit
        </Button>
      </div>
    </div>
  )
}