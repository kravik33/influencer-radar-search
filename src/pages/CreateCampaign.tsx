
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Users, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const CreateCampaign = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [campaignData, setCampaignData] = useState({
    name: '',
    country: '',
    niche: '',
    platforms: [] as string[],
    contentTypes: [] as string[],
    startDate: '',
    endDate: '',
    budgetRange: '',
    influencerAge: '',
    stopWords: ''
  });

  const countries = ['United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 'France', 'Spain', 'Italy'];
  const niches = ['Fashion', 'Tech', 'Food', 'Travel', 'Fitness', 'Beauty', 'Gaming', 'Lifestyle'];
  const platforms = ['Instagram', 'TikTok', 'YouTube', 'Twitter'];
  const contentTypes = ['Story', 'Post', 'Video', 'Reel', 'Short'];
  const budgetRanges = ['$1,000 - $5,000', '$5,000 - $10,000', '$10,000 - $25,000', '$25,000 - $50,000', '$50,000+'];
  const ageRanges = ['18-24', '25-34', '35-44', '45-54', '55+'];

  const handlePlatformToggle = (platform: string) => {
    setCampaignData(prev => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter(p => p !== platform)
        : [...prev.platforms, platform]
    }));
  };

  const handleContentTypeToggle = (type: string) => {
    setCampaignData(prev => ({
      ...prev,
      contentTypes: prev.contentTypes.includes(type)
        ? prev.contentTypes.filter(t => t !== type)
        : [...prev.contentTypes, type]
    }));
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    console.log('Campaign created:', campaignData);
    // Here you would typically send the data to your backend
    alert('Campaign created successfully!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/search" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Search</span>
            </Link>
            
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Zorepad
              </h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-900">Create Campaign</h1>
            <span className="text-gray-600">Step {currentStep} of 3</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
          {/* Step 1: Campaign Basics */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Name Your Campaign</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Name</label>
                <Input
                  value={campaignData.name}
                  onChange={(e) => setCampaignData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter campaign name..."
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Target Country</label>
                <select
                  value={campaignData.country}
                  onChange={(e) => setCampaignData(prev => ({ ...prev, country: e.target.value }))}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select country...</option>
                  {countries.map(country => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Niche</label>
                <select
                  value={campaignData.niche}
                  onChange={(e) => setCampaignData(prev => ({ ...prev, niche: e.target.value }))}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select niche...</option>
                  {niches.map(niche => (
                    <option key={niche} value={niche}>{niche}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Step 2: Platforms & Content */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Choose Platforms & Content Types</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">Platforms</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {platforms.map(platform => (
                    <button
                      key={platform}
                      onClick={() => handlePlatformToggle(platform)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        campaignData.platforms.includes(platform)
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-center space-x-2">
                        {campaignData.platforms.includes(platform) && (
                          <CheckCircle className="w-4 h-4" />
                        )}
                        <span className="font-medium">{platform}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">Content Types</label>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {contentTypes.map(type => (
                    <button
                      key={type}
                      onClick={() => handleContentTypeToggle(type)}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        campaignData.contentTypes.includes(type)
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-center space-x-2">
                        {campaignData.contentTypes.includes(type) && (
                          <CheckCircle className="w-4 h-4" />
                        )}
                        <span className="font-medium">{type}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Campaign Details */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Define Campaign Scope</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                  <Input
                    type="date"
                    value={campaignData.startDate}
                    onChange={(e) => setCampaignData(prev => ({ ...prev, startDate: e.target.value }))}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                  <Input
                    type="date"
                    value={campaignData.endDate}
                    onChange={(e) => setCampaignData(prev => ({ ...prev, endDate: e.target.value }))}
                    className="w-full"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Budget Range</label>
                <select
                  value={campaignData.budgetRange}
                  onChange={(e) => setCampaignData(prev => ({ ...prev, budgetRange: e.target.value }))}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select budget range...</option>
                  {budgetRanges.map(range => (
                    <option key={range} value={range}>{range}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Influencer Age</label>
                <select
                  value={campaignData.influencerAge}
                  onChange={(e) => setCampaignData(prev => ({ ...prev, influencerAge: e.target.value }))}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select age range...</option>
                  {ageRanges.map(age => (
                    <option key={age} value={age}>{age}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Stop Words (optional)</label>
                <Input
                  value={campaignData.stopWords}
                  onChange={(e) => setCampaignData(prev => ({ ...prev, stopWords: e.target.value }))}
                  placeholder="Enter words to avoid, separated by commas..."
                  className="w-full"
                />
                <p className="text-sm text-gray-500 mt-1">Words or topics that influencers should avoid in their content</p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous</span>
            </Button>

            {currentStep === 3 ? (
              <Button
                onClick={handleSubmit}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white flex items-center space-x-2"
              >
                <span>Create Campaign</span>
              </Button>
            ) : (
              <Button
                onClick={nextStep}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white flex items-center space-x-2"
              >
                <span>Next</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCampaign;
