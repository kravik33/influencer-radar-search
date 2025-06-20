
import { useState } from 'react';
import { SearchHeader } from '@/components/SearchHeader';
import { FilterSidebar } from '@/components/FilterSidebar';
import { InfluencerGrid } from '@/components/InfluencerGrid';
import { influencerData } from '@/data/influencers';

export interface Influencer {
  id: string;
  name: string;
  handle: string;
  platform: string;
  followers: number;
  engagementRate: number;
  niche: string;
  location: string;
  avatar: string;
  verified: boolean;
  avgLikes: number;
  avgComments: number;
}

export interface Filters {
  platform: string;
  minFollowers: number;
  maxFollowers: number;
  minEngagement: number;
  maxEngagement: number;
  niche: string;
  location: string;
}

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<Filters>({
    platform: 'all',
    minFollowers: 0,
    maxFollowers: 10000000,
    minEngagement: 0,
    maxEngagement: 20,
    niche: 'all',
    location: 'all',
  });

  const filteredInfluencers = influencerData.filter(influencer => {
    const matchesSearch = influencer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         influencer.handle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         influencer.niche.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPlatform = filters.platform === 'all' || influencer.platform === filters.platform;
    const matchesFollowers = influencer.followers >= filters.minFollowers && influencer.followers <= filters.maxFollowers;
    const matchesEngagement = influencer.engagementRate >= filters.minEngagement && influencer.engagementRate <= filters.maxEngagement;
    const matchesNiche = filters.niche === 'all' || influencer.niche === filters.niche;
    const matchesLocation = filters.location === 'all' || influencer.location === filters.location;

    return matchesSearch && matchesPlatform && matchesFollowers && matchesEngagement && matchesNiche && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <SearchHeader searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-80 flex-shrink-0">
            <FilterSidebar filters={filters} setFilters={setFilters} />
          </div>
          
          <div className="flex-1">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Discover Influencers
              </h2>
              <p className="text-gray-600">
                Found {filteredInfluencers.length} influencers matching your criteria
              </p>
            </div>
            
            <InfluencerGrid influencers={filteredInfluencers} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
