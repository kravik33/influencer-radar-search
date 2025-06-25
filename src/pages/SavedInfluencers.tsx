
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, Search, Plus, Trash2, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { influencerData } from '@/data/influencers';

const SavedInfluencers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPlatform, setFilterPlatform] = useState('all');
  
  // Mock saved influencers (in real app, this would come from user's saved data)
  const savedInfluencers = influencerData.slice(0, 6);

  const filteredInfluencers = savedInfluencers.filter(influencer => {
    const matchesSearch = influencer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         influencer.handle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         influencer.niche.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPlatform = filterPlatform === 'all' || influencer.platform === filterPlatform;

    return matchesSearch && matchesPlatform;
  });

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(0) + 'K';
    return num.toString();
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'Instagram': return 'bg-gradient-to-r from-purple-500 to-pink-500';
      case 'TikTok': return 'bg-gradient-to-r from-black to-red-500';
      case 'YouTube': return 'bg-gradient-to-r from-red-500 to-red-600';
      case 'Twitter': return 'bg-gradient-to-r from-blue-400 to-blue-500';
      default: return 'bg-gradient-to-r from-gray-500 to-gray-600';
    }
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
                  Find More
                </Button>
              </Link>
              <Link to="/create-campaign">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg transition-all duration-200">
                  Create Campaign
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Saved Influencers</h1>
          <p className="text-xl text-gray-600">Manage your curated list of influencers</p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Filter saved influencers by platform, country, or tag..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 py-3 text-lg"
              />
            </div>
            <select
              value={filterPlatform}
              onChange={(e) => setFilterPlatform(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[150px]"
            >
              <option value="all">All Platforms</option>
              <option value="Instagram">Instagram</option>
              <option value="TikTok">TikTok</option>
              <option value="YouTube">YouTube</option>
              <option value="Twitter">Twitter</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            {filteredInfluencers.length} saved influencer{filteredInfluencers.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Influencers Table/Grid */}
        {filteredInfluencers.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-100 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-6 flex items-center justify-center">
              <Users className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              {searchTerm || filterPlatform !== 'all' 
                ? 'No matching influencers found' 
                : "You haven't saved any influencers yet"
              }
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || filterPlatform !== 'all'
                ? 'Try adjusting your search or filter criteria'
                : 'Start building your influencer network by saving profiles from search results'
              }
            </p>
            <Link to="/search">
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                Discover Influencers
              </Button>
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Table Header */}
            <div className="hidden md:grid md:grid-cols-12 gap-4 p-6 bg-gray-50 border-b border-gray-200 font-medium text-gray-700">
              <div className="col-span-4">Name</div>
              <div className="col-span-2">Platform</div>
              <div className="col-span-2">Engagement</div>
              <div className="col-span-2">Notes</div>
              <div className="col-span-2">Actions</div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-gray-200">
              {filteredInfluencers.map((influencer) => (
                <div key={influencer.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                    {/* Name */}
                    <div className="col-span-1 md:col-span-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={influencer.avatar}
                          alt={influencer.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <Link 
                            to={`/influencer/${influencer.id}`}
                            className="font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                          >
                            {influencer.name}
                          </Link>
                          <p className="text-sm text-gray-600">@{influencer.handle}</p>
                          <p className="text-sm text-gray-500 md:hidden">{formatNumber(influencer.followers)} followers</p>
                        </div>
                      </div>
                    </div>

                    {/* Platform */}
                    <div className="col-span-1 md:col-span-2">
                      <span className={`inline-block px-3 py-1 rounded-full text-white text-sm font-medium ${getPlatformColor(influencer.platform)}`}>
                        {influencer.platform}
                      </span>
                    </div>

                    {/* Engagement */}
                    <div className="col-span-1 md:col-span-2">
                      <div className="text-sm">
                        <div className="font-semibold text-gray-900">{influencer.engagementRate}%</div>
                        <div className="text-gray-600">{formatNumber(influencer.followers)} followers</div>
                      </div>
                    </div>

                    {/* Notes */}
                    <div className="col-span-1 md:col-span-2">
                      <span className="text-sm text-gray-600 italic">High quality content</span>
                    </div>

                    {/* Actions */}
                    <div className="col-span-1 md:col-span-2">
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs px-3 py-1"
                        >
                          <Plus className="w-3 h-3 mr-1" />
                          Add to Campaign
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-600 border-red-200 hover:bg-red-50 text-xs px-3 py-1"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedInfluencers;
