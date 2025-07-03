
import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSavedInfluencers } from '@/hooks/useSavedInfluencers';
import { useAuth } from '@/hooks/useAuth';

interface SaveInfluencerButtonProps {
  influencerId: string;
  className?: string;
}

const SaveInfluencerButton = ({ influencerId, className = "" }: SaveInfluencerButtonProps) => {
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const { saveInfluencer, checkIfSaved } = useSavedInfluencers();
  const { user } = useAuth();

  useEffect(() => {
    if (user && influencerId) {
      checkIfSaved(influencerId).then(setIsSaved);
    }
  }, [user, influencerId, checkIfSaved]);

  const handleSave = async () => {
    if (loading || !user) return;
    
    setLoading(true);
    try {
      await saveInfluencer(influencerId);
      setIsSaved(true);
    } catch (error) {
      console.error('Error saving influencer:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <Button
      variant={isSaved ? "default" : "outline"}
      size="sm"
      onClick={handleSave}
      disabled={loading || isSaved}
      className={`${className} ${isSaved ? 'bg-red-500 hover:bg-red-600 text-white' : ''}`}
    >
      <Heart className={`w-4 h-4 mr-1 ${isSaved ? 'fill-white' : ''}`} />
      {isSaved ? 'Saved' : 'Save'}
    </Button>
  );
};

export default SaveInfluencerButton;
