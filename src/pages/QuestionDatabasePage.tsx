import { useState } from 'react';
import { Plus, Search, Filter, Edit, Trash2, Upload, Download, X, Save } from 'lucide-react';
import { subjects, mockQuestions, Question } from '../data/mockData';

export function QuestionDatabasePage() {
  const [questions, setQuestions] = useState<Question[]>(mockQuestions);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSubject, setFilterSubject] = useState<string>('all');
  const [filterDifficulty, setFilterDifficulty] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [formData, setFormData] = useState<Partial<Question>>({
    subject: '',
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
    explanation: '',
    difficulty: 'medium',
  });

  // Filter questions
  const filteredQuestions = questions.filter((q) => {
    const matchesSearch = q.question.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = filterSubject === 'all' || q.subject === filterSubject;
    const matchesDifficulty = filterDifficulty === 'all' || q.difficulty === filterDifficulty;
    return matchesSearch && matchesSubject && matchesDifficulty;
  });

  const handleAddQuestion = () => {
    const newQuestion: Question = {
      id: `q${questions.length + 1}`,
      subject: formData.subject!,
      question: formData.question!,
      options: formData.options as string[],
      correctAnswer: formData.correctAnswer!,
      explanation: formData.explanation!,
      difficulty: formData.difficulty as 'easy' | 'medium' | 'hard',
    };
    setQuestions([...questions, newQuestion]);
    resetForm();
    setShowAddModal(false);
  };

  const handleUpdateQuestion = () => {
    if (editingQuestion) {
      setQuestions(questions.map((q) => 
        q.id === editingQuestion.id 
          ? { ...editingQuestion, ...formData }
          : q
      ));
      resetForm();
      setEditingQuestion(null);
    }
  };

  const handleDeleteQuestion = (id: string) => {
    if (confirm('Are you sure you want to delete this question?')) {
      setQuestions(questions.filter((q) => q.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({
      subject: '',
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
      explanation: '',
      difficulty: 'medium',
    });
  };

  const openEditModal = (question: Question) => {
    setEditingQuestion(question);
    setFormData({
      subject: question.subject,
      question: question.question,
      options: [...question.options],
      correctAnswer: question.correctAnswer,
      explanation: question.explanation,
      difficulty: question.difficulty,
    });
  };

  const updateOption = (index: number, value: string) => {
    const newOptions = [...(formData.options || ['', '', '', ''])];
    newOptions[index] = value;
    setFormData({ ...formData, options: newOptions });
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Question Database</h1>
        <p className="text-gray-600 mt-1">Manage exam questions and content</p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="text-2xl font-bold text-gray-900">{questions.length}</div>
          <div className="text-sm text-gray-600 mt-1">Total Questions</div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="text-2xl font-bold text-green-600">
            {questions.filter((q) => q.difficulty === 'easy').length}
          </div>
          <div className="text-sm text-gray-600 mt-1">Easy Questions</div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="text-2xl font-bold text-orange-600">
            {questions.filter((q) => q.difficulty === 'medium').length}
          </div>
          <div className="text-sm text-gray-600 mt-1">Medium Questions</div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="text-2xl font-bold text-red-600">
            {questions.filter((q) => q.difficulty === 'hard').length}
          </div>
          <div className="text-sm text-gray-600 mt-1">Hard Questions</div>
        </div>
      </div>

      {/* Filters and Actions */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px] relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search questions..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <select
            value={filterSubject}
            onChange={(e) => setFilterSubject(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="all">All Subjects</option>
            {subjects.map((subject) => (
              <option key={subject.id} value={subject.id}>
                {subject.name}
              </option>
            ))}
          </select>

          <select
            value={filterDifficulty}
            onChange={(e) => setFilterDifficulty(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="all">All Difficulties</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Question
          </button>

          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Import
          </button>

          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
            <Download className="w-5 h-5" />
            Export
          </button>
        </div>
      </div>

      {/* Questions Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Question
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subject
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Difficulty
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Options
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredQuestions.map((question) => (
                <tr key={question.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 line-clamp-2 max-w-md">
                      {question.question}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm">
                      {subjects.find((s) => s.id === question.subject)?.name}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 rounded text-sm font-medium ${
                        question.difficulty === 'easy'
                          ? 'bg-green-100 text-green-700'
                          : question.difficulty === 'medium'
                          ? 'bg-orange-100 text-orange-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {question.options.length} options
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => openEditModal(question)}
                      className="text-green-600 hover:text-green-700 mr-3"
                    >
                      <Edit className="w-4 h-4 inline" />
                    </button>
                    <button
                      onClick={() => handleDeleteQuestion(question.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4 inline" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredQuestions.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">No questions found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Modal */}
      {(showAddModal || editingQuestion) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-xl p-8 max-w-3xl w-full my-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingQuestion ? 'Edit Question' : 'Add New Question'}
              </h2>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setEditingQuestion(null);
                  resetForm();
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
              {/* Subject */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                >
                  <option value="">Select a subject</option>
                  {subjects.map((subject) => (
                    <option key={subject.id} value={subject.id}>
                      {subject.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Difficulty */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Difficulty Level *
                </label>
                <div className="flex gap-4">
                  {['easy', 'medium', 'hard'].map((level) => (
                    <label key={level} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="difficulty"
                        value={level}
                        checked={formData.difficulty === level}
                        onChange={(e) => setFormData({ ...formData, difficulty: e.target.value as any })}
                        className="w-4 h-4 text-green-600"
                      />
                      <span className="text-sm text-gray-700 capitalize">{level}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Question */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Question Text *
                </label>
                <textarea
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter the question text..."
                  required
                />
              </div>

              {/* Options */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Answer Options *
                </label>
                <div className="space-y-3">
                  {formData.options?.map((option, index) => (
                    <div key={index} className="flex gap-3 items-start">
                      <div className="flex items-center pt-3">
                        <input
                          type="radio"
                          name="correctAnswer"
                          checked={formData.correctAnswer === index}
                          onChange={() => setFormData({ ...formData, correctAnswer: index })}
                          className="w-4 h-4 text-green-600"
                          title="Mark as correct answer"
                        />
                      </div>
                      <div className="flex-1">
                        <input
                          type="text"
                          value={option}
                          onChange={(e) => updateOption(index, e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder={`Option ${String.fromCharCode(65 + index)}`}
                          required
                        />
                      </div>
                      <div className="text-xs text-gray-500 pt-3">
                        {String.fromCharCode(65 + index)}
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Select the radio button next to the correct answer
                </p>
              </div>

              {/* Explanation */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Explanation *
                </label>
                <textarea
                  value={formData.explanation}
                  onChange={(e) => setFormData({ ...formData, explanation: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Provide an explanation for the correct answer..."
                  required
                />
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200">
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setEditingQuestion(null);
                  resetForm();
                }}
                className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={editingQuestion ? handleUpdateQuestion : handleAddQuestion}
                className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center gap-2"
              >
                <Save className="w-5 h-5" />
                {editingQuestion ? 'Update Question' : 'Add Question'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
