import { useState } from 'react';
import { User, Bell, Lock, Palette, Globe, Save } from 'lucide-react';
import { mockStudent } from '../data/mockData';

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [profile, setProfile] = useState(mockStudent);
  const [notifications, setNotifications] = useState({
    examReminders: true,
    performanceUpdates: true,
    studyTips: false,
    weeklyReport: true,
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'language', label: 'Language', icon: Globe },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">Manage your account preferences</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-green-50 text-green-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl border border-gray-200 p-8">
            {activeTab === 'profile' && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6">Profile Information</h2>
                <div className="space-y-6">
                  <div className="flex items-center gap-6">
                    <img
                      src={profile.avatar}
                      alt={profile.name}
                      className="w-24 h-24 rounded-full border-4 border-gray-100"
                    />
                    <div>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        Change Photo
                      </button>
                      <p className="text-sm text-gray-600 mt-2">JPG, PNG or GIF. Max 2MB</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Exam Number
                      </label>
                      <input
                        type="text"
                        value={profile.examNumber}
                        disabled
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        placeholder="+234 XXX XXX XXXX"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2">
                    <Save className="w-5 h-5" />
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6">Notification Preferences</h2>
                <div className="space-y-6">
                  {Object.entries(notifications).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          Receive notifications about {key.toLowerCase()}
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={value}
                          onChange={(e) => setNotifications({ ...notifications, [key]: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-300 peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6">Security Settings</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Password
                    </label>
                    <input
                      type="password"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      New Password
                    </label>
                    <input
                      type="password"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Update Password
                  </button>

                  <div className="pt-6 mt-6 border-t border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-4">Two-Factor Authentication</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Add an extra layer of security to your account
                    </p>
                    <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                      Enable 2FA
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'appearance' && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6">Appearance Settings</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Theme
                    </label>
                    <div className="grid grid-cols-3 gap-4">
                      {['Light', 'Dark', 'Auto'].map((theme) => (
                        <button
                          key={theme}
                          className="p-4 border-2 border-blue-500 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <div className={`w-full h-20 rounded-lg mb-2 ${
                            theme === 'Light' ? 'bg-white border border-gray-200' :
                            theme === 'Dark' ? 'bg-gray-900' :
                            'bg-gradient-to-br from-white to-gray-900'
                          }`} />
                          <span className="text-sm font-medium text-gray-900">{theme}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Font Size
                    </label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                      <option>Small</option>
                      <option selected>Medium (Default)</option>
                      <option>Large</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'language' && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6">Language & Region</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Language
                    </label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option>English</option>
                      <option>French</option>
                      <option>Yoruba</option>
                      <option>Igbo</option>
                      <option>Hausa</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Timezone
                    </label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option>West Africa Time (WAT)</option>
                      <option>Central Africa Time (CAT)</option>
                      <option>East Africa Time (EAT)</option>
                    </select>
                  </div>

                  <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                    <Save className="w-5 h-5" />
                    Save Changes
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}