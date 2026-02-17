import { useState } from 'react';
import { BookOpen, CheckCircle, XCircle, Lightbulb, ChevronLeft, ChevronRight } from 'lucide-react';
import { subjects, mockQuestions } from '../data/mockData';

export function ReviewModePage() {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const filteredQuestions = selectedSubject
    ? mockQuestions.filter((q) => q.subject === selectedSubject)
    : [];

  if (!selectedSubject) {
    return (
      <div className="p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Study Review Mode</h1>
            <p className="text-gray-600 mt-1">
              Practice questions without time limits and see explanations
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Lightbulb className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">How Review Mode Works</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Study at your own pace without time pressure</li>
                  <li>• Get instant feedback on your answers</li>
                  <li>• Read detailed explanations for each question</li>
                  <li>• Track your understanding of each topic</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {subjects.map((subject) => (
              <button
                key={subject.id}
                onClick={() => setSelectedSubject(subject.id)}
                className="bg-white rounded-xl border border-gray-200 hover:border-green-300 hover:shadow-lg transition-all overflow-hidden text-left"
              >
                <div className={`${subject.color} h-24 flex items-center justify-center`}>
                  <span className="text-5xl">{subject.icon}</span>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">{subject.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <BookOpen className="w-4 h-4" />
                    <span>{subject.totalQuestions} Questions</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (filteredQuestions.length === 0) {
    return (
      <div className="p-8">
        <button
          onClick={() => setSelectedSubject(null)}
          className="mb-4 text-blue-600 hover:text-blue-700 flex items-center gap-2"
        >
          <ChevronLeft className="w-5 h-5" />
          Back to subjects
        </button>
        <p className="text-gray-600">No questions available for this subject.</p>
      </div>
    );
  }

  const question = filteredQuestions[currentQuestion];
  const isCorrect = selectedAnswer === question.correctAnswer;

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => {
            setSelectedSubject(null);
            setCurrentQuestion(0);
            setShowAnswer(false);
            setSelectedAnswer(null);
          }}
          className="mb-6 text-blue-600 hover:text-blue-700 flex items-center gap-2"
        >
          <ChevronLeft className="w-5 h-5" />
          Back to subjects
        </button>

        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            {subjects.find((s) => s.id === selectedSubject)?.name}
          </h1>
          <p className="text-gray-600 mt-1">
            Question {currentQuestion + 1} of {filteredQuestions.length}
          </p>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-8 mb-6">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
              </span>
            </div>
            <p className="text-lg text-gray-900 leading-relaxed">{question.question}</p>
          </div>

          <div className="space-y-3 mb-6">
            {question.options.map((option, idx) => {
              const isSelected = selectedAnswer === idx;
              const isCorrectOption = idx === question.correctAnswer;
              const showCorrect = showAnswer && isCorrectOption;
              const showWrong = showAnswer && isSelected && !isCorrect;

              return (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedAnswer(idx);
                    setShowAnswer(false);
                  }}
                  disabled={showAnswer}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    showCorrect
                      ? 'border-green-500 bg-green-50'
                      : showWrong
                      ? 'border-red-500 bg-red-50'
                      : isSelected
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-green-300 bg-white'
                  } ${showAnswer ? 'cursor-not-allowed' : ''}`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        showCorrect
                          ? 'border-green-500 bg-green-500'
                          : showWrong
                          ? 'border-red-500 bg-red-500'
                          : isSelected
                          ? 'border-green-500 bg-green-500'
                          : 'border-gray-300'
                      }`}
                    >
                      {showCorrect && <CheckCircle className="w-4 h-4 text-white" />}
                      {showWrong && <XCircle className="w-4 h-4 text-white" />}
                      {!showAnswer && isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                    </div>
                    <span className="font-medium text-gray-700 mr-2">
                      {String.fromCharCode(65 + idx)}.
                    </span>
                    <span className="text-gray-900">{option}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {!showAnswer && selectedAnswer !== null && (
            <button
              onClick={() => setShowAnswer(true)}
              className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              Check Answer
            </button>
          )}

          {showAnswer && (
            <div className={`p-6 rounded-lg ${isCorrect ? 'bg-green-50' : 'bg-orange-50'}`}>
              <div className="flex items-start gap-3 mb-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  isCorrect ? 'bg-green-100' : 'bg-orange-100'
                }`}>
                  {isCorrect ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <Lightbulb className="w-5 h-5 text-orange-600" />
                  )}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">
                    {isCorrect ? 'Correct!' : 'Not quite right'}
                  </h4>
                  <p className="text-sm text-gray-700">{question.explanation}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => {
              setCurrentQuestion((prev) => Math.max(0, prev - 1));
              setShowAnswer(false);
              setSelectedAnswer(null);
            }}
            disabled={currentQuestion === 0}
            className="px-6 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <ChevronLeft className="w-5 h-5" />
            Previous
          </button>
          
          <span className="text-sm text-gray-600">
            {currentQuestion + 1} / {filteredQuestions.length}
          </span>

          <button
            onClick={() => {
              setCurrentQuestion((prev) => Math.min(filteredQuestions.length - 1, prev + 1));
              setShowAnswer(false);
              setSelectedAnswer(null);
            }}
            disabled={currentQuestion === filteredQuestions.length - 1}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            Next
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}