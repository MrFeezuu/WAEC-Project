import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Lock, Mail, Eye, EyeOff } from 'lucide-react';
import mtsLogo from 'figma:asset/da89be1998a2d76a34c79a65ce18784408c0ea44.png';
import waecLogo from 'figma:asset/7a14287745c87b8473e87a73d7d4e570470ae463.png';

export function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/app');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-600 via-green-700 to-green-800 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4">
            <img src={waecLogo} alt="WAEC Logo" className="w-14 h-14 sm:w-16 sm:h-16 object-contain" />
            <img src={mtsLogo} alt="MTS Logo" className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white p-1.5 sm:p-2" />
          </div>
          <div className="mb-3">
            <h1 className="text-xl sm:text-2xl font-bold text-white">WAEC Simulator 2025</h1>
            <p className="text-xs sm:text-sm text-green-100">by Mega-Tech Solution LTD</p>
          </div>
          <p className="text-green-100 text-sm sm:text-base">Sign in to continue your preparation</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Student Login</h2>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-9 sm:pl-10 pr-10 sm:pr-12 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" /> : <Eye className="w-4 h-4 sm:w-5 sm:h-5" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4 text-green-600 rounded" />
                <span className="text-gray-600">Remember me</span>
              </label>
              <button type="button" className="text-green-600 hover:text-green-700">
                Forgot password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2.5 sm:py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm sm:text-base"
            >
              Sign In
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-green-50 rounded-lg">
            <p className="text-sm font-medium text-gray-600 mb-2">Demo Credentials:</p>
            <p className="text-xs sm:text-sm text-gray-500">Email: demo@student.com</p>
            <p className="text-xs sm:text-sm text-gray-500">Password: demo123</p>
          </div>

          {/* Sign Up Link */}
          <p className="mt-4 sm:mt-6 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <button className="text-green-600 hover:text-green-700 font-medium">
              Register here
            </button>
          </p>
        </div>
        
        {/* Footer */}
        <div className="mt-6 sm:mt-8 text-center">
          <p className="text-xs sm:text-sm text-white/90">© 2025 Mega-Tech Solution LTD - All Rights Reserved</p>
        </div>
      </div>
    </div>
  );
}
