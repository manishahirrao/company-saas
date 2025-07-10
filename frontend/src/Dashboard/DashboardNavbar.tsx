import React from 'react';
import { Bell, CreditCard, User, LogOut, Settings, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { AdvancedVortexAnimation } from '@/Logo/Logo';

const DashboardNavbar = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  
  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };
  return (
    <nav className="sticky top-0 z-30 w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm flex items-center justify-between px-6 py-3 h-16">
      {/* Logo/Brand */}
      <div className="flex items-center space-x-3">
       
        <span className="font-bold text-xl ml-14 text-blue-600 dark:text-blue-400 tracking-tight">Vortex</span>
      </div>

      {/* Right side controls */}
      <div className="flex items-center space-x-6">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          aria-label={resolvedTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {resolvedTheme === 'dark' ? (
            <Sun className="h-5 w-5 text-yellow-400" />
          ) : (
            <Moon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          )}
        </button>

        {/* Credits */}
        <div className="flex items-center space-x-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-md font-semibold text-sm">
          <CreditCard className="h-4 w-4 mr-1" />
          <span>1,250 Credits</span>
        </div>
        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative hover:bg-gray-100 dark:hover:bg-gray-800">
          <Bell className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full ring-2 ring-white dark:ring-gray-900 bg-red-500"></span>
        </Button>
        {/* User Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="rounded-full h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-800">
              <User className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            align="end" 
            className="w-48 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
          >
            <DropdownMenuLabel className="text-gray-900 dark:text-gray-100">
              Manish<br />
              <span className="text-xs text-gray-500 dark:text-gray-400">m@example.com</span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-700" />
            <DropdownMenuItem className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
              <User className="h-4 w-4 mr-2" /> Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
              <Settings className="h-4 w-4 mr-2" /> Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-700" />
            <DropdownMenuItem className="text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700">
              <LogOut className="h-4 w-4 mr-2" /> Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default DashboardNavbar;