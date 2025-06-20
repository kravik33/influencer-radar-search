
import { InfluencerCard } from '@/components/InfluencerCard';
import { Influencer } from '@/pages/Index';

interface InfluencerGridProps {
  influencers: Influencer[];
}

export const InfluencerGrid = ({ influencers }: InfluencerGridProps) => {
  if (influencers.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
          <span className="text-4xl">🔍</span>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No influencers found</h3>
        <p className="text-gray-600">Try adjusting your search criteria or filters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {influencers.map((influencer) => (
        <InfluencerCard key={influencer.id} influencer={influencer} />
      ))}
    </div>
  );
};
