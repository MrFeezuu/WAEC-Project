import { Outlet, NavLink } from 'react-router';
import { Home, BookOpen, BarChart3, Settings, Shield, FileText, LogOut, Database, Menu, X } from 'lucide-react';
import { mockStudent } from '../data/mockData';
import { useState } from 'react';
import mtsLogo from 'figma:asset/da89be1998a2d76a34c79a65ce18784408c0ea44.png';
import waecLogo from 'figma:asset/7a14287745c87b8473e87a73d7d4e570470ae463.png';

export function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const navItems = [
    { to: '/app', icon: Home, label: 'Dashboard', end: true },
    { to: '/app/exam-center', icon: BookOpen, label: 'Exam Center' },
    { to: '/app/review', icon: FileText, label: 'Review Mode' },
    { to: '/app/analytics', icon: BarChart3, label: 'Analytics' },
    { to: '/app/questions', icon: Database, label: 'Question Bank' },
    { to: '/app/settings', icon: Settings, label: 'Settings' },
    { to: '/app/admin', icon: Shield, label: 'Admin Panel' },
  ];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg border border-gray-200"
      >
        {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-40
          w-64 sm:w-72 bg-white border-r border-gray-200 flex flex-col
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Logo Section */}
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <div className="flex items-center justify-center gap-3 mb-3">
            <img src={waecLogo} alt="WAEC Logo" className="w-12 h-12 sm:w-14 sm:h-14 object-contain" />
            <img src={mtsLogo} alt="MTS Logo" className="w-12 h-12 sm:w-14 sm:h-14 rounded-full" />
          </div>
          <div className="text-center">
            <h1 className="text-base sm:text-lg font-bold text-gray-900">WAEC Simulator</h1>
            <p className="text-xs text-gray-500">Excellence in Learning</p>
          </div>
        </div>

        {/* Profile Section */}
        <div className="p-3 sm:p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <img
              src={mockStudent.avatar}
              alt={mockStudent.name}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm sm:text-base text-gray-900 truncate">{mockStudent.name}</p>
              <p className="text-xs text-gray-500 truncate">{mockStudent.examNumber}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 sm:p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg transition-colors text-sm sm:text-base ${
                  isActive
                    ? 'bg-green-50 text-green-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`
              }
            >
              <item.icon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span className="truncate">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-3 sm:p-4 border-t border-gray-200">
          <button
            onClick={() => window.location.href = '/'}
            className="flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-red-600 hover:bg-red-50 w-full transition-colors text-sm sm:text-base"
          >
            <LogOut className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
            <span>Logout</span>
          </button>
          <div className="mt-3 sm:mt-4 text-center">
            <p className="text-xs text-gray-500">© 2025 Mega-Tech Solution LTD</p>
            <p className="text-xs text-gray-400">All Rights Reserved</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto w-full lg:w-auto">
        <Outlet />
      </main>
    </div>
  );
}
