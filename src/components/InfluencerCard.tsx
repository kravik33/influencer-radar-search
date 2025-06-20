
import { Heart, MessageCircle, Users, MapPin, CheckCircle } from 'lucide-react';
import { Influencer } from '@/pages/Index';

interface InfluencerCardProps {
  influencer: Influencer;
}

export const InfluencerCard = ({ influencer }: InfluencerCardProps) => {
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
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <img
              src={influencer.avatar}
              alt={influencer.name}
              className="w-14 h-14 rounded-full object-cover"
            />
            {influencer.verified && (
              <CheckCircle className="absolute -bottom-1 -right-1 w-5 h-5 text-blue-500 bg-white rounded-full" />
            )}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{influencer.name}</h3>
            <p className="text-gray-600 text-sm">@{influencer.handle}</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-white text-xs font-medium ${getPlatformColor(influencer.platform)}`}>
          {influencer.platform}
        </span>
      </div>

      <div className="mb-4">
        <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
          {influencer.niche}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-1 text-gray-600 mb-1">
            <Users className="w-4 h-4" />
            <span className="text-xs">Followers</span>
          </div>
          <p className="font-semibold text-lg text-gray-900">{formatNumber(influencer.followers)}</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center space-x-1 text-gray-600 mb-1">
            <Heart className="w-4 h-4" />
            <span className="text-xs">Engagement</span>
          </div>
          <p className="font-semibold text-lg text-gray-900">{influencer.engagementRate}%</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-600">
        <div className="flex items-center space-x-1">
          <Heart className="w-4 h-4" />
          <span>{formatNumber(influencer.avgLikes)} avg likes</span>
        </div>
        <div className="flex items-center space-x-1">
          <MessageCircle className="w-4 h-4" />
          <span>{formatNumber(influencer.avgComments)} avg comments</span>
        </div>
      </div>

      <div className="flex items-center space-x-1 text-sm text-gray-600 mb-6">
        <MapPin className="w-4 h-4" />
        <span>{influencer.location}</span>
      </div>

      <div className="flex space-x-2">
        <button className="flex-1 py-2 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-200 text-sm font-medium">
          View Profile
        </button>
        <button className="flex-1 py-2 px-4 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
          Save
        </button>
      </div>
    </div>
  );
};
