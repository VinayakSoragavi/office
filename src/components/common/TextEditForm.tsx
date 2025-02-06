"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface TextEditFormProps {
  initialText: string
  onSave: (text: string) => void
  onClose: () => void
  position: { x: number; y: number }
}

export function TextEditForm({ initialText, onSave, onClose, position }: TextEditFormProps) {
  const [text, setText] = useState(initialText)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(text)
  }

  return (
    <div className="absolute bg-[#242424] p-4 rounded-md shadow-lg z-20" style={{ left: position.x, top: position.y }}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <Input
          ref={inputRef}
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="bg-[#3a3a3a] text-white"
        />
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" className="text-black" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Save</Button>
        </div>
      </form>
    </div>
  )
}

