"use client"

import { useState } from "react"
import NewFieldButton from "./_components/new-field-button"
import GridOfBoxes from "./_components/grid-of-boxes"

function Page() {
  const [formElements, setFormElements] = useState<Array<any>>([])

  const findAvailablePosition = (elements: any[], columns = 12, rows = 10) => {
    const grid = Array(rows)
      .fill(null)
      .map(() => Array(columns).fill(false))

    elements.forEach((element) => {
      const startX = element.position.x
      const startY = element.position.y
      const width = element.size.width
      const height = element.size.height

      for (let y = startY; y < startY + height; y++) {
        for (let x = startX; x < startX + width; x++) {
          if (y < rows && x < columns) {
            grid[y][x] = true
          }
        }
      }
    })

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < columns; x++) {
        if (!grid[y][x]) {
          return { x, y }
        }
      }
    }

    return { x: 0, y: 0 }
  }

  const handleAddElement = (element) => {
    const position = findAvailablePosition(formElements)
    setFormElements([
      ...formElements,
      {
        ...element,
        position,
        size: { width: 4, height: 1 }, // Initial size of 4x1 boxes
        type: element.name.toLowerCase().includes("select")
          ? "select"
          : element.name.toLowerCase().includes("date")
            ? "date"
            : "text",
      },
    ])
  }

  const handlePositionChange = (index, newPosition) => {
    const updatedElements = [...formElements]
    updatedElements[index].position = newPosition
    setFormElements(updatedElements)
  }

  const handleElementResize = (index, widthInBoxes, heightInBoxes) => {
    const updatedElements = [...formElements]
    updatedElements[index].size = { width: widthInBoxes, height: heightInBoxes }
    setFormElements(updatedElements)
  }

  return (
    <div className="p-2">
      <NewFieldButton onAddElement={handleAddElement} />
      <GridOfBoxes
        formElements={formElements}
        onPositionChange={handlePositionChange}
        onElementResize={handleElementResize}
      />
    </div>
  )
}

export default Page

