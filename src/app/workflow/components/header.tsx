"use client";

import { Bell, Home, Menu, Settings, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function Header() {
  return (
    <div className="backdrop-blur-md bg-white/30 border-b border-white/30 rounded-xl shadow-lg mx-4 my-0 w-full">
      <div className="flex h-[72px] items-center justify-between px-4">
        {/* Left side */}
        <div className="">
        <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="text-gray-500 hover:text-gray-700">
              <Home className="h-4 w-4" />
            </Link>
            <span className="text-gray-300">/</span>
            <Link href="/dashboards" className="text-gray-500 hover:text-gray-700">
              Dashboards
            </Link>
            <span className="text-gray-300">/</span>
            <Link href="/analytics" className="text-[#344767] hover:text-gray-700 ">
              Analytics
            </Link>
          </div>

          <h1 className="text-[#2b3674] font-semibold font-[Roboto,Helvetica,Arial,sans-serif] text-base mt-1">Analytics</h1>
        </div>

        {/* Center */}
        <div className="lg:hidden">
          <Menu className="h-6 w-6 text-[#2b3674]" />
        </div>

        {/* Right side */}
        <div className="flex items-center gap-6">
          <div className="relative hidden lg:block">
            <Input
              type="search"
              placeholder="Search here"
              className="w-[280px] h-[40px] rounded-lg border-white/40 bg-white/20 backdrop-blur-sm px-4 py-4 text-sm focus:border-white/60 focus:ring-0 placeholder:text-gray-600 ring-1 ring-[#d2d6da]"
            />
          </div>
          <div className="flex items-center gap-4">
            <button className="text-[#2b3674] hover:text-[#2b3674]/80 transition-colors">
              <User className="h-6 w-6" />
            </button>
            <button className="text-[#2b3674] hover:text-[#2b3674]/80 transition-colors">
              <Settings className="h-6 w-6" />
            </button>
            <button className="relative text-[#2b3674] hover:text-[#2b3674]/80 transition-colors">
              <Bell className="h-6 w-6" />
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white">
                9
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}