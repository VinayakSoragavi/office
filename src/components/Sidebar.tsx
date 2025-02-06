"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Box,
  CreditCardIcon as BillingCard,
  ChevronDown,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useState } from "react"
import { menuItems } from "@/json/menu/menu"



function MenuItem({ item, level = 0 }: { item: any; level?: number }) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  if (item.isHeader) {
    return (
      <div className="mt-6 first:mt-0">
        <h2 className="px-4 py-2 text-xs uppercase text-zinc-500">{item.title}</h2>
        <div className="space-y-1">
          {item.submenu?.map((subItem: any, index: number) => (
            <MenuItem key={index} item={subItem} level={level + 1} />
          ))}
        </div>
      </div>
    )
  }

  if (item.submenu) {
    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-between text-zinc-400 hover:text-white hover:bg-zinc-800",
              pathname.startsWith(item.path) && "text-white bg-zinc-800",
              level > 0 && "pl-8",
            )}
          >
            <span className="flex items-center">
              {item.icon && <item.icon className="mr-2 h-4 w-4" />}
              {item.title}
            </span>
            <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", isOpen && "rotate-180")} />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-1">
          {item.submenu.map((subItem: any, index: number) => (
            <MenuItem key={index} item={subItem} level={level + 1} />
          ))}
        </CollapsibleContent>
      </Collapsible>
    )
  }

  return (
    <Button
      asChild
      variant="ghost"
      className={cn(
        "w-full justify-start text-zinc-400 hover:text-white hover:bg-zinc-800",
        pathname === item.path && "text-white bg-zinc-800",
        level > 0 && "pl-8",
      )}
    >
      <Link href={item.path}>
        {item.icon && <item.icon className="mr-2 h-4 w-4" />}
        {item.title}
      </Link>
    </Button>
  )
}

export function Sidebar() {
  return (
    <div className="w-64 min-h-screen bg-zinc-900 text-white">
      <div className="p-6 flex items-center gap-2 border-b border-zinc-800">
        <Box className="h-6 w-6" />
        <h1 className="font-semibold">Material Dashboard PRO</h1>
      </div>

      <div className="p-4 border-b border-zinc-800">
        <div className="flex items-center gap-3">
          <Avatar>
            {/* <AvatarImage src="/placeholder.svg" /> */}
            <AvatarFallback>BA</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">Brooklyn Alice</p>
          </div>
        </div>
      </div>

      <ScrollArea className="h-[calc(100vh-8rem)] px-3">
        <div className="py-4">
          {menuItems.map((item, index) => (
            <MenuItem key={index} item={item} />
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

