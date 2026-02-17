import { useState } from 'react';
import { Link } from 'react-router';
import { Clock, BookOpen, Search, Filter } from 'lucide-react';
import { subjects } from '../data/mockData';

export function ExamCenterPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState<string>('all');

  const filteredSubjects = subjects.filter((subject) =>
    subject.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Exam Center</h1>
        <p className="text-gray-600 mt-1 text-sm sm:text-base">Select a subject to begin your practice exam</p>
      </div>

      {/* Search and Filter */}
      <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search subjects..."
            className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base"
          />
        </div>
        <button className="px-4 sm:px-6 py-2.5 sm:py-3 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2 text-sm sm:text-base">
          <Filter className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>Filter</span>
        </button>
      </div>

      {/* Info Banner */}
      <div className="mb-8 bg-green-50 border border-green-200 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <BookOpen className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Exam Instructions</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Each exam is timed according to WAEC standards</li>
              <li>• You must complete all questions before submitting</li>
              <li>• Review mode is available after exam completion</li>
              <li>• Your progress is automatically saved</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Subjects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {filteredSubjects.map((subject) => (
          <div
            key={subject.id}
            className="bg-white rounded-xl border border-gray-200 hover:border-green-300 hover:shadow-lg transition-all overflow-hidden"
          >
            <div className={`${subject.color} h-24 sm:h-32 flex items-center justify-center`}>
              <span className="text-5xl sm:text-6xl">{subject.icon}</span>
            </div>
            <div className="p-4 sm:p-6">
              <h3 className="font-semibold text-gray-900 mb-3 text-sm sm:text-base">{subject.name}</h3>
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                  <BookOpen className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span>{subject.totalQuestions} Questions</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                  <Clock className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span>{subject.duration} Minutes</span>
                </div>
              </div>
              <Link
                to={`/app/exam/${subject.id}`}
                className="block w-full py-2.5 sm:py-3 text-center bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm sm:text-base"
              >
                Start Exam
              </Link>
            </div>
          </div>
        ))}
      </div>

      {filteredSubjects.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-2">
            <BookOpen className="w-16 h-16 mx-auto" />
          </div>
          <p className="text-gray-600">No subjects found matching your search.</p>
        </div>
      )}
    </div>
  );
}