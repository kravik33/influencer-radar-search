
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

  console.log('SaveInfluencerButton: user:', user?.email, 'influencerId:', influencerId);

  useEffect(() => {
    const checkSaved = async () => {
      if (user && influencerId) {
        console.log('Checking if influencer is saved:', influencerId);
        try {
          const saved = await checkIfSaved(influencerId);
          console.log('Is saved result:', saved);
          setIsSaved(saved);
        } catch (error) {
          console.error('Error checking if saved:', error);
        }
      }
    };
    
    checkSaved();
  }, [user, influencerId, checkIfSaved]);

  const handleSave = async () => {
    console.log('Save button clicked, current state:', { loading, user: !!user, isSaved });
    
    if (loading || !user) {
      console.log('Save blocked: loading or no user');
      return;
    }
    
    setLoading(true);
    try {
      console.log('Attempting to save influencer:', influencerId);
      await saveInfluencer(influencerId);
      setIsSaved(true);
      console.log('Successfully saved influencer');
    } catch (error) {
      console.error('Error saving influencer:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    console.log('No user, not rendering save button');
    return null;
  }

  return (
    <Button
      variant={isSaved ? "default" : "outline"}
      size="sm"
      onClick={handleSave}
      disabled={loading || isSaved}
      className={`${className} ${isSaved ? 'bg-red-500 hover:bg-red-600 text-white' : ''}`}
    >
      <Heart className={`w-4 h-4 mr-1 ${isSaved ? 'fill-white' : ''}`} />
      {loading ? 'Saving...' : (isSaved ? 'Saved' : 'Save')}
    </Button>
  );
};

export default SaveInfluencerButton;
