"use client"

import { useState } from "react"
import { Image, ChevronRight, User, Settings, CreditCard} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface SidebarProps {
    onAddNode: (type: string) => void
  }

export const PagesDropdown = ({ onAddNode }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const pageItems = [
    { name: "Leave ", icon: User },
    { name: "Shift Change", icon: Settings },
    { name: "Punch Regularization", icon: CreditCard },
  ]

  return (
    <div>
      <motion.div
        className="flex items-center justify-between px-3 py-2 menu-item-hover rounded-lg mb-1 cursor-pointer"
        onClick={toggleDropdown}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex items-center gap-3">
          <Image className="w-5 h-5" />
          <span className="text-sm">Work Flow</span>
        </div>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </motion.div>
      </motion.div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="pl-4 space-y-1 overflow-hidden"
          >
            {pageItems.map((item, index) => (
              <motion.button
                key={index}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center px-3 py-2 menu-item-hover rounded-lg"
                whileHover={{ x: 5 }}
                onClick={()=>onAddNode && onAddNode("start-flow")}
              >
                <item.icon className="w-4 h-4 mr-2 text-gray-400" />
                <span className="text-sm">{item.name}</span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

