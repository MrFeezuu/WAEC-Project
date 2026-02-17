import { Link } from 'react-router';
import { BookOpen, Award, TrendingUp, Clock, Target, Calendar } from 'lucide-react';
import { mockStudent, mockResults, subjects } from '../data/mockData';

export function DashboardPage() {
  const recentResults = mockResults.slice(0, 3);
  const upcomingSubjects = subjects.slice(0, 4);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Welcome back, {mockStudent.name.split(' ')[0]}!</h1>
        <p className="text-gray-600 mt-1 text-sm sm:text-base">Continue your exam preparation journey</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
        <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
            </div>
            <span className="text-xs sm:text-sm text-green-600 font-medium">+2 this week</span>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-gray-900">{mockStudent.examsTaken}</div>
          <div className="text-xs sm:text-sm text-gray-600 mt-1">Exams Taken</div>
        </div>

        <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Award className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
            </div>
            <span className="text-xs sm:text-sm text-green-600 font-medium">+5%</span>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-gray-900">{mockStudent.averageScore}%</div>
          <div className="text-xs sm:text-sm text-gray-600 mt-1">Average Score</div>
        </div>

        <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
            </div>
            <span className="text-xs sm:text-sm text-blue-600 font-medium">67% done</span>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-gray-900">8/12</div>
          <div className="text-xs sm:text-sm text-gray-600 mt-1">Subjects Covered</div>
        </div>

        <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-gray-900">24.5h</div>
          <div className="text-xs sm:text-sm text-gray-600 mt-1">Study Time</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Recent Results */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">Recent Exam Results</h2>
            <Link to="/app/analytics" className="text-green-600 hover:text-green-700 text-xs sm:text-sm font-medium">
              View All
            </Link>
          </div>
          <div className="space-y-3 sm:space-y-4">
            {recentResults.map((result) => (
              <div key={result.id} className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200 hover:border-green-300 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{result.subjectName}</h3>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-1">
                      <span className="text-xs sm:text-sm text-gray-500 flex items-center gap-1">
                        <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                        {new Date(result.date).toLocaleDateString()}
                      </span>
                      <span className="text-xs sm:text-sm text-gray-500 flex items-center gap-1">
                        <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                        {result.duration}
                      </span>
                    </div>
                  </div>
                  <div className="text-left sm:text-right">
                    <div className="text-xl sm:text-2xl font-bold text-gray-900">{result.percentage}%</div>
                    <div className="text-xs sm:text-sm text-gray-500">{result.score}/{result.totalQuestions}</div>
                  </div>
                </div>
                <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-green-500 to-green-600 rounded-full"
                    style={{ width: `${result.percentage}%` }}
                  />
                </div>
                <div className="mt-4 flex flex-col sm:flex-row gap-2">
                  <Link
                    to={`/app/result/${result.id}`}
                    className="flex-1 py-2 text-center text-xs sm:text-sm font-medium text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                  >
                    View Details
                  </Link>
                  <button className="flex-1 py-2 text-center text-xs sm:text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                    Review Answers
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-3 sm:space-y-4">
            <Link
              to="/app/exam-center"
              className="block bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl p-4 sm:p-6 hover:from-green-700 hover:to-green-800 transition-all"
            >
              <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 mb-2 sm:mb-3" />
              <h3 className="font-semibold mb-1 text-sm sm:text-base">Start New Exam</h3>
              <p className="text-xs sm:text-sm text-green-100">Choose a subject and begin</p>
            </Link>

            <Link
              to="/app/review"
              className="block bg-white border border-gray-200 rounded-xl p-4 sm:p-6 hover:border-green-300 transition-colors"
            >
              <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 mb-2 sm:mb-3 text-green-600" />
              <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">Study Review Mode</h3>
              <p className="text-xs sm:text-sm text-gray-600">Practice without time limits</p>
            </Link>

            <Link
              to="/app/analytics"
              className="block bg-white border border-gray-200 rounded-xl p-4 sm:p-6 hover:border-green-300 transition-colors"
            >
              <Target className="w-6 h-6 sm:w-8 sm:h-8 mb-2 sm:mb-3 text-purple-600" />
              <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">View Analytics</h3>
              <p className="text-xs sm:text-sm text-gray-600">Track your performance</p>
            </Link>
          </div>

          {/* Study Streak */}
          <div className="mt-4 sm:mt-6 bg-gradient-to-br from-orange-500 to-pink-500 text-white rounded-xl p-4 sm:p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="text-2xl sm:text-3xl">🔥</div>
              <div>
                <div className="text-xl sm:text-2xl font-bold">7 Days</div>
                <div className="text-xs sm:text-sm text-orange-100">Study Streak</div>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-orange-100">Keep it up! You're doing great.</p>
          </div>
        </div>
      </div>
    </div>
  );
}