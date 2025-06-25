
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, Camera, CreditCard, Bell, Shield, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const AccountSettings = () => {
  const [profile, setProfile] = useState({
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    company: 'Acme Marketing Agency',
    notifications: {
      email: true,
      sms: false,
      campaigns: true,
      newInfluencers: false
    }
  });

  const handleProfileUpdate = (field: string, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleNotificationToggle = (field: string) => {
    setProfile(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [field]: !prev.notifications[field as keyof typeof prev.notifications]
      }
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Zorepad
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link to="/search">
                <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
                  Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Account Settings</h1>
          <p className="text-xl text-gray-600">Manage your profile and subscription</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-8">
              <nav className="space-y-2">
                <a href="#profile" className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-blue-50 text-blue-700 font-medium">
                  <Users className="w-5 h-5" />
                  <span>Profile</span>
                </a>
                <a href="#subscription" className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                  <CreditCard className="w-5 h-5" />
                  <span>Subscription</span>
                </a>
                <a href="#notifications" className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                  <Bell className="w-5 h-5" />
                  <span>Notifications</span>
                </a>
                <a href="#security" className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                  <Shield className="w-5 h-5" />
                  <span>Security</span>
                </a>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Profile Section */}
            <div id="profile" className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile Information</h2>
              
              {/* Profile Picture */}
              <div className="flex items-center space-x-6 mb-8">
                <div className="relative">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                    <Users className="w-12 h-12 text-white" />
                  </div>
                  <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
                    <Camera className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{profile.fullName}</h3>
                  <p className="text-gray-600">{profile.email}</p>
                  <Button variant="outline" className="mt-2 text-sm">
                    Change Photo
                  </Button>
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <Input
                    value={profile.fullName}
                    onChange={(e) => handleProfileUpdate('fullName', e.target.value)}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <Input
                    type="email"
                    value={profile.email}
                    onChange={(e) => handleProfileUpdate('email', e.target.value)}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                  <Input
                    value={profile.company}
                    onChange={(e) => handleProfileUpdate('company', e.target.value)}
                    className="w-full"
                  />
                </div>

                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                  Save Changes
                </Button>
              </div>
            </div>

            {/* Subscription Section */}
            <div id="subscription" className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Subscription</h2>
              
              {/* Current Plan */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Current Plan: Pro</h3>
                    <p className="text-gray-600">$99/month</p>
                    <p className="text-sm text-blue-600 font-medium mt-1">You're on a 7-day free trial. Upgrade anytime.</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Next billing date</p>
                    <p className="font-semibold text-gray-900">January 15, 2025</p>
                  </div>
                </div>
              </div>

              {/* Plan Features */}
              <div className="space-y-4 mb-6">
                <h4 className="font-semibold text-gray-900">Your plan includes:</h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Unlimited influencer search</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Advanced AI filters</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Campaign management</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Analytics dashboard</span>
                  </li>
                </ul>
              </div>

              <div className="flex space-x-4">
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                  Manage Subscription
                </Button>
                <Button variant="outline">
                  View Billing History
                </Button>
              </div>
            </div>

            {/* Notifications Section */}
            <div id="notifications" className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Notification Preferences</h2>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <div>
                    <h3 className="font-medium text-gray-900">Email Notifications</h3>
                    <p className="text-sm text-gray-600">Receive updates via email</p>
                  </div>
                  <button
                    onClick={() => handleNotificationToggle('email')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      profile.notifications.email ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        profile.notifications.email ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <div>
                    <h3 className="font-medium text-gray-900">Campaign Updates</h3>
                    <p className="text-sm text-gray-600">Get notified about campaign progress</p>
                  </div>
                  <button
                    onClick={() => handleNotificationToggle('campaigns')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      profile.notifications.campaigns ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        profile.notifications.campaigns ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between py-3">
                  <div>
                    <h3 className="font-medium text-gray-900">New Influencers</h3>
                    <p className="text-sm text-gray-600">Weekly digest of trending creators</p>
                  </div>
                  <button
                    onClick={() => handleNotificationToggle('newInfluencers')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      profile.notifications.newInfluencers ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        profile.notifications.newInfluencers ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-red-200">
              <h2 className="text-2xl font-bold text-red-600 mb-6">Danger Zone</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between py-4 border-b border-gray-200">
                  <div>
                    <h3 className="font-medium text-gray-900">Sign Out</h3>
                    <p className="text-sm text-gray-600">Sign out of your account on this device</p>
                  </div>
                  <Button variant="outline" className="flex items-center space-x-2 text-gray-700 border-gray-300">
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </Button>
                </div>

                <div className="flex items-center justify-between py-4">
                  <div>
                    <h3 className="font-medium text-red-600">Delete Account</h3>
                    <p className="text-sm text-gray-600">Permanently delete your account and all data</p>
                  </div>
                  <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                    Delete Account
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
