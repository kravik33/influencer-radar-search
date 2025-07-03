
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import UserMenu from './UserMenu';

interface SearchHeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export const SearchHeader = ({ searchTerm, setSearchTerm }: SearchHeaderProps) => {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Search className="w-5 h-5 text-white" />
            </div>
            <div>
              <Link to="/">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Zorepad
                </h1>
              </Link>
              <p className="text-sm text-gray-600">Find the perfect influencers for your brand</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link to="/saved">
              <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
                Saved
              </Button>
            </Link>
            <Link to="/campaigns">
              <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
                My Campaigns
              </Button>
            </Link>
            <Link to="/create-campaign">
              <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
                Create Campaign
              </Button>
            </Link>
            <UserMenu />
          </div>
        </div>
        
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search influencers by name, handle, or topic..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/70 backdrop-blur-sm text-lg placeholder-gray-500"
          />
        </div>
      </div>
    </header>
  );
};
