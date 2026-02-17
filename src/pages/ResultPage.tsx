import { useLocation, useParams, Link } from 'react-router';
import { Award, TrendingUp, Clock, Target, CheckCircle, XCircle, Home } from 'lucide-react';

export function ResultPage() {
  const location = useLocation();
  const { examId } = useParams();
  
  // Get data from navigation state or mock data
  const result = location.state || {
    score: 42,
    totalQuestions: 50,
    subjectName: 'Mathematics',
    answers: {}
  };

  const percentage = Math.round((result.score / result.totalQuestions) * 100);
  const grade = percentage >= 80 ? 'A' : percentage >= 70 ? 'B' : percentage >= 60 ? 'C' : percentage >= 50 ? 'D' : 'F';
  const passed = percentage >= 50;

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        {/* Result Card */}
        <div className={`rounded-2xl p-8 mb-8 text-center ${
          passed 
            ? 'bg-gradient-to-br from-green-500 to-emerald-600' 
            : 'bg-gradient-to-br from-red-500 to-pink-600'
        }`}>
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-4">
            <Award className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">
            {passed ? 'Congratulations!' : 'Keep Trying!'}
          </h1>
          <p className="text-white/90 text-lg mb-6">
            You {passed ? 'passed' : 'did not pass'} the {result.subjectName} exam
          </p>
          
          <div className="inline-block bg-white rounded-xl px-8 py-6">
            <div className="text-6xl font-bold text-gray-900 mb-2">{percentage}%</div>
            <div className="text-gray-600">
              {result.score} out of {result.totalQuestions} correct
            </div>
          </div>
        </div>

        {/* Statistics Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{grade}</div>
                <div className="text-sm text-gray-600">Grade</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{result.score}</div>
                <div className="text-sm text-gray-600">Correct Answers</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {result.totalQuestions - result.score}
                </div>
                <div className="text-sm text-gray-600">Wrong Answers</div>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Analysis */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Performance Analysis</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Accuracy Rate</span>
                <span className="font-medium text-gray-900">{percentage}%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-500 to-green-600"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 pt-4">
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-gray-900">Strengths</span>
                </div>
                <p className="text-sm text-gray-600">
                  Strong performance in basic concepts and problem-solving
                </p>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-5 h-5 text-orange-600" />
                  <span className="font-medium text-gray-900">Areas to Improve</span>
                </div>
                <p className="text-sm text-gray-600">
                  Focus more on advanced topics and time management
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <Link
            to="/app"
            className="flex-1 py-4 text-center bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            Back to Dashboard
          </Link>
          <Link
            to="/app/review"
            className="flex-1 py-4 text-center bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Review Answers
          </Link>
          <Link
            to="/app/exam-center"
            className="flex-1 py-4 text-center bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            Take Another Exam
          </Link>
        </div>
      </div>
    </div>
  );
}