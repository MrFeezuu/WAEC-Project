import { useState } from 'react';
import { Users, BookOpen, BarChart3, Settings, Plus, Search, Filter, Download } from 'lucide-react';

export function AdminPage() {
  const [activeTab, setActiveTab] = useState('overview');

  const students = [
    { id: 1, name: 'Adebayo Johnson', email: 'adebayo@email.com', exams: 12, avg: 78, lastActive: '2 hours ago' },
    { id: 2, name: 'Chioma Okafor', email: 'chioma@email.com', exams: 15, avg: 85, lastActive: '1 day ago' },
    { id: 3, name: 'Ibrahim Hassan', email: 'ibrahim@email.com', exams: 8, avg: 72, lastActive: '3 hours ago' },
    { id: 4, name: 'Fatima Bello', email: 'fatima@email.com', exams: 20, avg: 91, lastActive: '30 mins ago' },
  ];

  const stats = [
    { label: 'Total Students', value: '248', change: '+12%', icon: Users, color: 'bg-blue-500' },
    { label: 'Active Exams', value: '1,234', change: '+8%', icon: BookOpen, color: 'bg-green-500' },
    { label: 'Avg Performance', value: '78%', change: '+5%', icon: BarChart3, color: 'bg-purple-500' },
    { label: 'Completion Rate', value: '92%', change: '+3%', icon: Settings, color: 'bg-orange-500' },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
        <p className="text-gray-600 mt-1">Manage students, exams, and system settings</p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm text-green-600 font-medium">{stat.change}</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="flex gap-8">
          {['overview', 'students', 'exams', 'settings'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 px-2 font-medium transition-colors ${
                activeTab === tab
                  ? 'text-green-600 border-b-2 border-green-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      {activeTab === 'students' && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Student Management</h2>
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Add Student
              </button>
            </div>
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search students..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Filter
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
                <Download className="w-5 h-5" />
                Export
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Exams Taken
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Avg Score
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Active
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {students.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-medium">
                            {student.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="font-medium text-gray-900">{student.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {student.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {student.exams}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-sm font-medium ${
                        student.avg >= 80 ? 'bg-green-100 text-green-700' :
                        student.avg >= 70 ? 'bg-blue-100 text-blue-700' :
                        'bg-orange-100 text-orange-700'
                      }`}>
                        {student.avg}%
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {student.lastActive}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button className="text-green-600 hover:text-green-700 mr-3">View</button>
                      <button className="text-gray-600 hover:text-gray-700">Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'overview' && (
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {[
                { action: 'New student registered', user: 'Adebayo Johnson', time: '2 mins ago' },
                { action: 'Exam completed', user: 'Chioma Okafor', time: '15 mins ago' },
                { action: 'Question bank updated', user: 'Admin', time: '1 hour ago' },
                { action: 'Result published', user: 'System', time: '2 hours ago' },
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-600">{activity.user}</p>
                  </div>
                  <span className="text-sm text-gray-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all">
                <Plus className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                <span className="text-sm text-gray-600">Add Question</span>
              </button>
              <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all">
                <Users className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                <span className="text-sm text-gray-600">Add Student</span>
              </button>
              <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all">
                <BookOpen className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                <span className="text-sm text-gray-600">Create Exam</span>
              </button>
              <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all">
                <Download className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                <span className="text-sm text-gray-600">Export Data</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}