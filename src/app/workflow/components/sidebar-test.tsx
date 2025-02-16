import React from 'react';
import { 
  LayoutDashboard, 
  Image, 
  Grid, 
  ShoppingBag,
  KeyRound,
  FileText,
  ChevronDown,
  Settings
} from 'lucide-react';

const SidebarTest = () => {
  return (
    <div className="w-64 h-full  bg-gradient-to-b from-[#3f3f46] to-[#1b1b1b] backdrop-blur-lg shadow-lg text-white flex flex-col rounded-xl">
      {/* Header */}
      <div className="p-4 border-b border-[rgba(255,255,255,0.08)]">
        <div className="flex items-center gap-2">
          <Grid className="w-6 h-6 text-[white]" />
          <h1 className=" font-semibold text-lg text-[16px]" >Material Dashboard PRO</h1>
        </div>
      </div>

      {/* User Profile */}
      <div className="p-4 border-b border-[rgba(255,255,255,0.08)]">
        <div className="flex items-center gap-3">
          <img 
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces"
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex items-center justify-between flex-1">
            <span className="font-medium text-sm">Brooklyn Alice</span>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto">
        <div className="p-4">
          {/* Dashboards Section */}
          <div className="mb-6">
            <div className="flex items-center justify-between px-3 py-2 bg-[rgba(255,255,255,0.04)] rounded-lg mb-2 menu-item-hover">
              <div className="flex items-center gap-3">
                <LayoutDashboard className="w-5 h-5 text-[white]" />
                <span className=' text-sm'>Dashboards</span>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>
            <div className="space-y-1 pl-3">
              <div className="flex items-center gap-3 px-3 py-2 active-item rounded-lg">
                <span className="w-6 h-6 flex items-center justify-center bg-white text-[#1a73e8] rounded-lg font-medium">A</span>
                <span className=' text-sm'>Analytics</span>
              </div>
              <div className="flex items-center gap-3 px-3 py-2 menu-item-hover rounded-lg">
                <span className="w-6 h-6 flex items-center justify-center text-gray-400">S</span>
                <span className=' text-sm'>Sales</span>
              </div>
            </div>
          </div>

          {/* Pages Section */}
          <div className="mb-2">
            <span className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Pages</span>
          </div>

          {/* Pages Menu Items */}
          {[
            { icon: <Image className="w-5 h-5" />, label: 'Pages' },
            { icon: <Grid className="w-5 h-5" />, label: 'Applications' },
            { icon: <ShoppingBag className="w-5 h-5" />, label: 'Ecommerce' },
            { icon: <KeyRound className="w-5 h-5" />, label: 'Authentication' },
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between px-3 py-2 menu-item-hover rounded-lg mb-1">
              <div className="flex items-center gap-3">
                {item.icon}
                <span className=' text-sm'>{item.label}</span>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>
          ))}

          {/* Docs Section */}
          <div className="mt-6 mb-2">
            <span className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Docs</span>
          </div>

          {/* Docs Menu Items */}
          {[
            { icon: <FileText className="w-5 h-5" />, label: 'Basic' },
            { icon: <Settings className="w-5 h-5" />, label: 'Components' },
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between px-3 py-2 menu-item-hover rounded-lg mb-1">
              <div className="flex items-center gap-3">
                {item.icon}
                <span className=' text-sm'>{item.label}</span>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default SidebarTest;