
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from './use-toast';

export interface SavedInfluencer {
  id: string;
  influencer_id: string;
  saved_at: string;
  influencer: {
    id: string;
    name: string;
    username: string;
    platform: string;
    country: string;
    engagement_rate: number;
    followers: number;
    avatar_url: string;
  };
}

export const useSavedInfluencers = () => {
  const [savedInfluencers, setSavedInfluencers] = useState<SavedInfluencer[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  console.log('useSavedInfluencers: current user:', user?.email);

  const fetchSavedInfluencers = async () => {
    if (!user) {
      console.log('No user, skipping fetch');
      setLoading(false);
      return;
    }

    console.log('Fetching saved influencers for user:', user.id);

    try {
      const { data, error } = await supabase
        .from('saved_influencers')
        .select(`
          id,
          influencer_id,
          saved_at,
          influencer:influencers (
            id,
            name,
            username,
            platform,
            country,
            engagement_rate,
            followers,
            avatar_url
          )
        `)
        .eq('user_id', user.id);

      if (error) {
        console.error('Error fetching saved influencers:', error);
        throw error;
      }
      
      console.log('Fetched saved influencers:', data);
      setSavedInfluencers(data as SavedInfluencer[]);
    } catch (error) {
      console.error('Error fetching saved influencers:', error);
      toast({
        title: "Error",
        description: "Failed to load saved influencers",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const saveInfluencer = async (influencerId: string) => {
    if (!user) {
      console.log('No user, cannot save influencer');
      return;
    }

    console.log('Saving influencer:', influencerId, 'for user:', user.id);

    try {
      // Check if already saved
      const { data: existing } = await supabase
        .from('saved_influencers')
        .select('id')
        .eq('user_id', user.id)
        .eq('influencer_id', influencerId)
        .maybeSingle();

      if (existing) {
        console.log('Influencer already saved');
        toast({
          title: "Already saved",
          description: "This influencer is already in your saved list",
        });
        return;
      }

      const { error } = await supabase
        .from('saved_influencers')
        .insert({
          user_id: user.id,
          influencer_id: influencerId,
        });

      if (error) {
        console.error('Error saving influencer:', error);
        throw error;
      }

      console.log('Influencer saved successfully');
      toast({
        title: "Success",
        description: "Influencer saved to your list",
      });

      // Refresh the saved list
      fetchSavedInfluencers();
    } catch (error) {
      console.error('Error saving influencer:', error);
      toast({
        title: "Error",
        description: "Failed to save influencer",
        variant: "destructive",
      });
    }
  };

  const removeSavedInfluencer = async (savedInfluencerId: string) => {
    console.log('Removing saved influencer:', savedInfluencerId);
    
    try {
      const { error } = await supabase
        .from('saved_influencers')
        .delete()
        .eq('id', savedInfluencerId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Influencer removed from your saved list",
      });

      fetchSavedInfluencers();
    } catch (error) {
      console.error('Error removing saved influencer:', error);
      toast({
        title: "Error",
        description: "Failed to remove influencer",
        variant: "destructive",
      });
    }
  };

  const checkIfSaved = async (influencerId: string): Promise<boolean> => {
    if (!user) {
      console.log('No user, returning false for checkIfSaved');
      return false;
    }

    console.log('Checking if saved:', influencerId, 'for user:', user.id);

    try {
      const { data, error } = await supabase
        .from('saved_influencers')
        .select('id')
        .eq('user_id', user.id)
        .eq('influencer_id', influencerId)
        .maybeSingle();

      if (error) {
        console.error('Error checking if saved:', error);
        return false;
      }

      const isSaved = !!data;
      console.log('checkIfSaved result:', isSaved);
      return isSaved;
    } catch (error) {
      console.error('Error in checkIfSaved:', error);
      return false;
    }
  };

  useEffect(() => {
    fetchSavedInfluencers();
  }, [user]);

  return {
    savedInfluencers,
    loading,
    saveInfluencer,
    removeSavedInfluencer,
    checkIfSaved,
    refetch: fetchSavedInfluencers,
  };
};
