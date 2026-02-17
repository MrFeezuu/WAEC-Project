import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Award, Target, Calendar } from 'lucide-react';
import { mockResults } from '../data/mockData';

export function AnalyticsPage() {
  const performanceData = [
    { month: 'Jan', score: 65 },
    { month: 'Feb', score: 72 },
    { month: 'Mar', score: 78 },
    { month: 'Apr', score: 75 },
    { month: 'May', score: 82 },
    { month: 'Jun', score: 85 },
  ];

  const subjectPerformance = [
    { subject: 'Math', score: 84 },
    { subject: 'English', score: 76 },
    { subject: 'Physics', score: 80 },
    { subject: 'Chemistry', score: 78 },
    { subject: 'Biology', score: 82 },
  ];

  const pieData = [
    { name: 'Correct', value: 420, color: '#10b981' },
    { name: 'Wrong', value: 180, color: '#ef4444' },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Performance Analytics</h1>
        <p className="text-gray-600 mt-1">Track your progress and identify areas for improvement</p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Award className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-sm text-green-600 font-medium">+5%</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">78%</div>
          <div className="text-sm text-gray-600 mt-1">Average Score</div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-sm text-green-600 font-medium">+12</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">12</div>
          <div className="text-sm text-gray-600 mt-1">Exams Completed</div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900">8/12</div>
          <div className="text-sm text-gray-600 mt-1">Subjects Covered</div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900">7</div>
          <div className="text-sm text-gray-600 mt-1">Day Streak</div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* Performance Trend */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Performance Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={3} dot={{ fill: '#3b82f6', r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Subject Performance */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Subject Performance</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={subjectPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="subject" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Bar dataKey="score" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Answer Distribution */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Answer Distribution</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full" />
              <span className="text-sm text-gray-600">Correct (70%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full" />
              <span className="text-sm text-gray-600">Wrong (30%)</span>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {mockResults.map((result) => (
              <div key={result.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    result.percentage >= 80 ? 'bg-green-100' : result.percentage >= 70 ? 'bg-blue-100' : 'bg-orange-100'
                  }`}>
                    <span className="text-2xl">
                      {result.percentage >= 80 ? '🏆' : result.percentage >= 70 ? '📘' : '📙'}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{result.subjectName}</h3>
                    <p className="text-sm text-gray-600">{new Date(result.date).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-gray-900">{result.percentage}%</div>
                  <div className="text-sm text-gray-500">{result.score}/{result.totalQuestions}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
