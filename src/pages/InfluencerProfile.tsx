import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Users, Heart, MessageCircle, MapPin, CheckCircle, Calendar, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { influencerData } from '@/data/influencers';

const InfluencerProfile = () => {
  const { id } = useParams();
  
  // Find influencer by ID, with fallback to first influencer if ID is invalid
  const influencer = influencerData.find(inf => inf.id === id) || influencerData[0];

  console.log('Looking for influencer with ID:', id);
  console.log('Available influencer IDs:', influencerData.map(inf => inf.id));
  console.log('Found influencer:', influencer);

  if (!influencer) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Influencer not found</h1>
          <Link to="/search">
            <Button>Back to Search</Button>
          </Link>
        </div>
      </div>
    );
  }

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

  const samplePosts = [
    { id: 1, image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop', likes: '15.2K', comments: '324' },
    { id: 2, image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=400&fit=crop', likes: '18.7K', comments: '456' },
    { id: 3, image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop', likes: '22.1K', comments: '612' },
  ];

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

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Profile Header */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="relative">
              <img
                src={influencer.avatar}
                alt={influencer.name}
                className="w-32 h-32 rounded-full object-cover"
              />
              {influencer.verified && (
                <CheckCircle className="absolute -bottom-2 -right-2 w-8 h-8 text-blue-500 bg-white rounded-full" />
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{influencer.name}</h1>
                <span className={`px-3 py-1 rounded-full text-white text-sm font-medium ${getPlatformColor(influencer.platform)}`}>
                  {influencer.platform}
                </span>
              </div>
              <p className="text-gray-600 text-lg mb-4">@{influencer.handle}</p>
              
              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{formatNumber(influencer.followers)}</div>
                  <div className="text-sm text-gray-600">Followers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{influencer.engagementRate}%</div>
                  <div className="text-sm text-gray-600">Engagement Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{formatNumber(influencer.avgLikes)}</div>
                  <div className="text-sm text-gray-600">Avg Likes</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{formatNumber(influencer.avgComments)}</div>
                  <div className="text-sm text-gray-600">Avg Comments</div>
                </div>
              </div>

              <div className="flex items-center space-x-2 text-gray-600 mb-6">
                <MapPin className="w-4 h-4" />
                <span>{influencer.location}</span>
              </div>

              <div className="flex space-x-4">
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-lg transition-all duration-200">
                  Save to Campaign
                </Button>
                <Button variant="outline" className="border-2 border-blue-200 hover:border-blue-400 hover:bg-blue-50">
                  Invite to Campaign
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* About Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Creator</h2>
              <p className="text-gray-600 leading-relaxed">
                {influencer.niche} content creator passionate about sharing authentic experiences and connecting with audiences. 
                Known for high engagement rates and quality content that resonates with followers across {influencer.platform}.
                Based in {influencer.location}, creating content that inspires and engages a global audience.
              </p>
            </div>

            {/* Recent Posts */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Posts</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {samplePosts.map((post) => (
                  <div key={post.id} className="group cursor-pointer">
                    <div className="relative overflow-hidden rounded-2xl">
                      <img
                        src={post.image}
                        alt="Post"
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                        <div className="p-4 text-white">
                          <div className="flex items-center space-x-4 text-sm">
                            <div className="flex items-center space-x-1">
                              <Heart className="w-4 h-4" />
                              <span>{post.likes}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MessageCircle className="w-4 h-4" />
                              <span>{post.comments}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Niche</span>
                  <span className="font-medium text-gray-900">{influencer.niche}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Verified</span>
                  <span className="font-medium text-gray-900">{influencer.verified ? 'Yes' : 'No'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Platform</span>
                  <span className="font-medium text-gray-900">{influencer.platform}</span>
                </div>
              </div>
            </div>

            {/* Collaboration Info */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Collaboration</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-600" />
                  <span className="text-gray-600 text-sm">Available for campaigns</span>
                </div>
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-4 h-4 text-gray-600" />
                  <span className="text-gray-600 text-sm">Rates available on request</span>
                </div>
              </div>
              <Button className="w-full mt-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                Request Collaboration
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfluencerProfile;
