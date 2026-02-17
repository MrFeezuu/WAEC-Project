import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Clock, Flag, ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';
import { subjects, mockQuestions } from '../data/mockData';

export function ExamRoomPage() {
  const { subjectId } = useParams();
  const navigate = useNavigate();
  
  const subject = subjects.find((s) => s.id === subjectId);
  const questions = mockQuestions.filter((q) => q.subject === subjectId);
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [flagged, setFlagged] = useState<Set<number>>(new Set());
  const [timeRemaining, setTimeRemaining] = useState(subject ? subject.duration * 60 : 0);
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (optionIndex: number) => {
    setAnswers({ ...answers, [currentQuestion]: optionIndex });
  };

  const toggleFlag = () => {
    const newFlagged = new Set(flagged);
    if (newFlagged.has(currentQuestion)) {
      newFlagged.delete(currentQuestion);
    } else {
      newFlagged.add(currentQuestion);
    }
    setFlagged(newFlagged);
  };

  const handleSubmit = () => {
    // Calculate score
    let score = 0;
    questions.forEach((q, idx) => {
      if (answers[idx] === q.correctAnswer) {
        score++;
      }
    });
    
    // Navigate to results
    navigate('/app/result/new', { 
      state: { 
        score, 
        totalQuestions: questions.length,
        subjectName: subject?.name,
        answers 
      } 
    });
  };

  if (!subject || questions.length === 0) {
    return (
      <div className="p-8">
        <div className="text-center">
          <p className="text-gray-600">Subject not found or no questions available.</p>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  const answeredCount = Object.keys(answers).length;
  const progress = (answeredCount / questions.length) * 100;

  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-gray-900">{subject.name}</h1>
            <p className="text-xs sm:text-sm text-gray-600">
              Question {currentQuestion + 1} of {questions.length}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6">
            <div className="text-left sm:text-right">
              <div className="text-xs sm:text-sm text-gray-600">Time Remaining</div>
              <div className={`text-base sm:text-xl font-bold ${timeRemaining < 300 ? 'text-red-600' : 'text-gray-900'}`}>
                <Clock className="inline w-4 h-4 sm:w-5 sm:h-5 mr-1" />
                {formatTime(timeRemaining)}
              </div>
            </div>
            <button
              onClick={() => setShowSubmitModal(true)}
              className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm sm:text-base"
            >
              Submit Exam
            </button>
          </div>
        </div>
        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Progress: {answeredCount}/{questions.length} answered</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden flex-col lg:flex-row">
        {/* Question Panel */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 lg:p-8 mb-4 sm:mb-6">
              <div className="flex items-start justify-between mb-4 sm:mb-6 gap-3">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <span className="px-2 sm:px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs sm:text-sm font-medium">
                      Question {currentQuestion + 1}
                    </span>
                    {flagged.has(currentQuestion) && (
                      <span className="px-2 sm:px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs sm:text-sm font-medium">
                        Flagged
                      </span>
                    )}
                  </div>
                  <p className="text-sm sm:text-base lg:text-lg text-gray-900 leading-relaxed">{currentQ.question}</p>
                </div>
                <button
                  onClick={toggleFlag}
                  className={`ml-2 sm:ml-4 p-2 rounded-lg transition-colors flex-shrink-0 ${
                    flagged.has(currentQuestion)
                      ? 'bg-yellow-100 text-yellow-600'
                      : 'bg-gray-100 text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <Flag className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>

              <div className="space-y-2 sm:space-y-3">{currentQ.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswerSelect(idx)}
                    className={`w-full text-left p-3 sm:p-4 rounded-lg border-2 transition-all ${
                      answers[currentQuestion] === idx
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-green-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div
                        className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                          answers[currentQuestion] === idx
                            ? 'border-green-500 bg-green-500'
                            : 'border-gray-300'
                        }`}
                      >
                        {answers[currentQuestion] === idx && (
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full" />
                        )}
                      </div>
                      <span className="font-medium text-gray-700 mr-2 text-sm sm:text-base">
                        {String.fromCharCode(65 + idx)}.
                      </span>
                      <span className="text-gray-900 text-sm sm:text-base">{option}</span>
                    </div>
                  </button>
                ))}</div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between gap-3">
              <button
                onClick={() => setCurrentQuestion((prev) => Math.max(0, prev - 1))}
                disabled={currentQuestion === 0}
                className="flex-1 sm:flex-none px-4 sm:px-6 py-2.5 sm:py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Previous</span>
              </button>
              <button
                onClick={() => setCurrentQuestion((prev) => Math.min(questions.length - 1, prev + 1))}
                disabled={currentQuestion === questions.length - 1}
                className="flex-1 sm:flex-none px-4 sm:px-6 py-2.5 sm:py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Question Navigator Sidebar */}
        <div className="w-full lg:w-80 bg-white border-t lg:border-l lg:border-t-0 border-gray-200 overflow-y-auto p-4 sm:p-6 max-h-64 lg:max-h-none">
          <h3 className="font-semibold text-gray-900 mb-4 text-sm sm:text-base">Question Navigator</h3>
          <div className="grid grid-cols-8 sm:grid-cols-10 lg:grid-cols-5 gap-2">
            {questions.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentQuestion(idx)}
                className={`aspect-square rounded-lg font-medium text-xs sm:text-sm transition-all ${
                  currentQuestion === idx
                    ? 'bg-green-600 text-white ring-2 ring-green-300'
                    : answers[idx] !== undefined
                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                    : flagged.has(idx)
                    ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>

          <div className="mt-6 space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-4 h-4 bg-green-100 rounded" />
              <span className="text-gray-600">Answered ({answeredCount})</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-4 h-4 bg-gray-100 rounded" />
              <span className="text-gray-600">Not Answered ({questions.length - answeredCount})</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-4 h-4 bg-yellow-100 rounded" />
              <span className="text-gray-600">Flagged ({flagged.size})</span>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Submit Exam?</h3>
                <p className="text-sm text-gray-600">
                  You have answered {answeredCount} out of {questions.length} questions.
                  {answeredCount < questions.length && ' Some questions are still unanswered.'}
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowSubmitModal(false)}
                className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Continue Exam
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Submit Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}