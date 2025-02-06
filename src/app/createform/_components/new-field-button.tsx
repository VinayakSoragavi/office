"use client"

import { useState } from "react"
import { Plus, Type, List, CheckSquare, Calendar, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"

const formElements = [
  { name: "Text Input", icon: Type },
  { name: "Select", icon: List },
  { name: "Checkbox", icon: CheckSquare },
  { name: "Date Picker", icon: Calendar },
  { name: "Text Area", icon: FileText },
]

export default function NewFieldButton({ onAddElement }) {
  const [isOpen, setIsOpen] = useState(false)

  const handleAddElement = (element) => {
    onAddElement(element)
    setIsOpen(false)
  }

  return (
    <div className="relative z-50">
      <div className="flex items-center gap-2">
        <Button
          variant="default"
          size="icon"
          className={`h-8 w-8 rounded-lg bg-black transition-all duration-300 ${
            isOpen ? "bg-gray-800 shadow-lg scale-105" : "hover:bg-black/90"
          }`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <Plus className={`h-4 w-4 transition-transform duration-300 ${isOpen ? "rotate-90" : ""}`} />
          <span className="sr-only">New field</span>
        </Button>
        <Button
          variant="secondary"
          className={`h-8 rounded-lg bg-white text-sm font-normal text-black transition-all duration-300 ${
            isOpen ? "bg-gray-100 shadow-md translate-x-1" : "hover:bg-gray-50"
          }`}
          onClick={() => setIsOpen(!isOpen)}
        >
          New field
        </Button>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 py-2 bg-white rounded-lg shadow-xl border border-gray-100 animate-in fade-in slide-in-from-top-2">
          <h3 className="font-medium px-3 mb-2">Create new form with:</h3>
          <ul className="text-sm">
            {formElements.map((element, index) => (
              <li key={index}>
                <Button
                  variant="ghost"
                  className="w-full justify-start px-3 py-2 hover:bg-gray-100"
                  onClick={() => handleAddElement(element)}
                >
                  <element.icon className="h-4 w-4 mr-2" />
                  {element.name}
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

