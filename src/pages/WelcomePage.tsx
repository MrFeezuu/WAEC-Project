import { Link } from 'react-router';
import { BookOpen, Award, BarChart3, Users } from 'lucide-react';
import mtsLogo from 'figma:asset/da89be1998a2d76a34c79a65ce18784408c0ea44.png';
import waecLogo from 'figma:asset/7a14287745c87b8473e87a73d7d4e570470ae463.png';

export function WelcomePage() {
  const features = [
    {
      icon: BookOpen,
      title: 'Comprehensive Practice',
      description: 'Access thousands of past questions across all WAEC subjects',
    },
    {
      icon: Award,
      title: 'Exam Simulation',
      description: 'Experience real exam conditions with timed assessments',
    },
    {
      icon: BarChart3,
      title: 'Performance Analytics',
      description: 'Track your progress and identify areas for improvement',
    },
    {
      icon: Users,
      title: 'Expert Review',
      description: 'Detailed explanations and study materials from professionals',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-600 via-green-700 to-green-800">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-sm border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-2">
              <img src={waecLogo} alt="WAEC Logo" className="w-10 h-10 sm:w-12 sm:h-12 object-contain" />
              <img src={mtsLogo} alt="MTS Logo" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white p-1" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg sm:text-xl font-bold text-white">WAEC Simulator</h1>
              <p className="text-xs text-green-100">Excellence in Learning</p>
            </div>
          </div>
          <Link
            to="/login"
            className="px-4 sm:px-6 py-2 bg-white text-green-700 rounded-lg hover:bg-green-50 transition-colors text-sm sm:text-base font-medium"
          >
            Login
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-20">
        <div className="text-center mb-12 sm:mb-16">
          {/* Mobile Logo Display */}
          <div className="sm:hidden flex justify-center gap-3 mb-6">
            <img src={waecLogo} alt="WAEC Logo" className="w-16 h-16 object-contain" />
            <img src={mtsLogo} alt="MTS Logo" className="w-16 h-16 rounded-full" />
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 px-4">
            Ace Your WAEC Exams with Confidence
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-green-100 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            The ultimate exam preparation platform designed to help West African students
            excel in their examinations
          </p>
          <Link
            to="/login"
            className="inline-block px-6 sm:px-8 py-3 sm:py-4 bg-white text-green-700 rounded-lg hover:bg-green-50 transition-colors text-base sm:text-lg font-medium shadow-lg"
          >
            Get Started Today
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-12 sm:mt-20 px-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 sm:p-6 hover:bg-white/20 transition-colors"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-green-100 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 mt-12 sm:mt-20 text-center px-4">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 sm:p-8">
            <div className="text-3xl sm:text-4xl font-bold text-white mb-2">5000+</div>
            <div className="text-green-100 text-sm sm:text-base">Practice Questions</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 sm:p-8">
            <div className="text-3xl sm:text-4xl font-bold text-white mb-2">33+</div>
            <div className="text-green-100 text-sm sm:text-base">Subject Coverage</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 sm:p-8">
            <div className="text-3xl sm:text-4xl font-bold text-white mb-2">98%</div>
            <div className="text-green-100 text-sm sm:text-base">Success Rate</div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-white/10 backdrop-blur-sm border-t border-white/20 py-4 sm:py-6 mt-8 sm:mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-white font-medium mb-1 text-sm sm:text-base">© 2025 Mega-Tech Solution LTD</p>
          <p className="text-green-100 text-xs sm:text-sm">All Rights Reserved - Bridging the Digital Divide</p>
        </div>
      </footer>
    </div>
  );
}
