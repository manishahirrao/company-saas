import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, PenSquare, Briefcase, Settings, Bot, LayoutDashboard } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/dashboard/content', icon: PenSquare, label: 'Content' },
  { href: '/dashboard/hiring', icon: Briefcase, label: 'Hiring' },
  { href: '/dashboard/ai-operations', icon: Bot, label: 'AI Operations' },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="w-64 flex-shrink-0 bg-gray-900 text-white flex flex-col">
      <div className="h-16 flex items-center justify-center px-4 bg-gray-900 border-b border-gray-800">
        <Link to="/" className="flex items-center space-x-2">
          <Bot className="h-8 w-8 text-blue-500" />
          <span className="text-xl font-bold">PostPilot AI</span>
        </Link>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.label}
            to={item.href}
            className={cn(
              'flex items-center px-4 py-2.5 rounded-lg text-sm font-medium transition-colors',
              location.pathname.startsWith(item.href)
                ? 'bg-blue-600 text-white'
                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
            )}
          >
            <item.icon className="h-5 w-5 mr-3" />
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="px-4 py-6 border-t border-gray-800">
        <Link
          to="/dashboard/settings"
          className={cn(
            'flex items-center px-4 py-2.5 rounded-lg text-sm font-medium transition-colors',
            location.pathname.startsWith('/dashboard/settings')
              ? 'bg-blue-600 text-white'
              : 'text-gray-300 hover:bg-gray-800 hover:text-white'
          )}
        >
          <Settings className="h-5 w-5 mr-3" />
          Settings
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
