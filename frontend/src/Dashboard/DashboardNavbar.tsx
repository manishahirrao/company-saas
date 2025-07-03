import React from 'react';
import { Bell, CreditCard, User, LogOut, Settings } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { AdvancedVortexAnimation } from '@/Logo/logo';

const DashboardNavbar = () => {
  return (
    <nav className="sticky top-0 z-30 w-full bg-white border-b shadow-sm flex items-center justify-between px-6 py-3 h-16">
      {/* Logo/Brand */}
      <div className="flex items-center space-x-3">
        <AdvancedVortexAnimation/>
        <span className="font-bold text-xl text-blue-600 tracking-tight">Vortex</span>
      </div>

      {/* Right side controls */}
      <div className="flex items-center space-x-6">
        {/* Credits */}
        <div className="flex items-center space-x-1 bg-blue-50 text-blue-700 px-3 py-1 rounded-md font-semibold text-sm">
          <CreditCard className="h-4 w-4 mr-1" />
          <span>1,250 Credits</span>
        </div>
        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5 text-gray-500" />
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full ring-2 ring-white bg-red-500"></span>
        </Button>
        {/* User Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="rounded-full h-8 w-8 p-0">
              <User className="h-5 w-5 text-gray-700" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Manish<br /><span className="text-xs text-gray-400">m@example.com</span></DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="h-4 w-4 mr-2" /> Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="h-4 w-4 mr-2" /> Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">
              <LogOut className="h-4 w-4 mr-2" /> Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
