
import { Filters } from '@/pages/Index';

interface FilterSidebarProps {
  filters: Filters;
  setFilters: (filters: Filters) => void;
}

export const FilterSidebar = ({ filters, setFilters }: FilterSidebarProps) => {
  const platforms = ['all', 'Instagram', 'TikTok', 'YouTube', 'Twitter'];
  const niches = ['all', 'Fashion', 'Tech', 'Food', 'Travel', 'Fitness', 'Beauty', 'Gaming', 'Lifestyle'];
  const locations = ['all', 'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 'France'];

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(0) + 'K';
    return num.toString();
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-32">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Filters</h3>
      
      <div className="space-y-6">
        {/* Platform Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Platform</label>
          <select
            value={filters.platform}
            onChange={(e) => setFilters({ ...filters, platform: e.target.value })}
            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {platforms.map(platform => (
              <option key={platform} value={platform}>
                {platform === 'all' ? 'All Platforms' : platform}
              </option>
            ))}
          </select>
        </div>

        {/* Followers Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Followers: {formatNumber(filters.minFollowers)} - {formatNumber(filters.maxFollowers)}
          </label>
          <div className="space-y-3">
            <input
              type="range"
              min="0"
              max="10000000"
              step="10000"
              value={filters.minFollowers}
              onChange={(e) => setFilters({ ...filters, minFollowers: parseInt(e.target.value) })}
              className="w-full"
            />
            <input
              type="range"
              min="0"
              max="10000000"
              step="10000"
              value={filters.maxFollowers}
              onChange={(e) => setFilters({ ...filters, maxFollowers: parseInt(e.target.value) })}
              className="w-full"
            />
          </div>
        </div>

        {/* Engagement Rate */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Engagement Rate: {filters.minEngagement}% - {filters.maxEngagement}%
          </label>
          <div className="space-y-3">
            <input
              type="range"
              min="0"
              max="20"
              step="0.1"
              value={filters.minEngagement}
              onChange={(e) => setFilters({ ...filters, minEngagement: parseFloat(e.target.value) })}
              className="w-full"
            />
            <input
              type="range"
              min="0"
              max="20"
              step="0.1"
              value={filters.maxEngagement}
              onChange={(e) => setFilters({ ...filters, maxEngagement: parseFloat(e.target.value) })}
              className="w-full"
            />
          </div>
        </div>

        {/* Niche Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Niche</label>
          <select
            value={filters.niche}
            onChange={(e) => setFilters({ ...filters, niche: e.target.value })}
            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {niches.map(niche => (
              <option key={niche} value={niche}>
                {niche === 'all' ? 'All Niches' : niche}
              </option>
            ))}
          </select>
        </div>

        {/* Location Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Location</label>
          <select
            value={filters.location}
            onChange={(e) => setFilters({ ...filters, location: e.target.value })}
            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {locations.map(location => (
              <option key={location} value={location}>
                {location === 'all' ? 'All Locations' : location}
              </option>
            ))}
          </select>
        </div>

        {/* Reset Filters */}
        <button
          onClick={() => setFilters({
            platform: 'all',
            minFollowers: 0,
            maxFollowers: 10000000,
            minEngagement: 0,
            maxEngagement: 20,
            niche: 'all',
            location: 'all',
          })}
          className="w-full py-3 text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};
