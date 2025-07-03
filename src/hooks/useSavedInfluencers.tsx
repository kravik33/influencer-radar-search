
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

  const fetchSavedInfluencers = async () => {
    if (!user) return;

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

      if (error) throw error;
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
    if (!user) return;

    try {
      // Check if already saved
      const { data: existing } = await supabase
        .from('saved_influencers')
        .select('id')
        .eq('user_id', user.id)
        .eq('influencer_id', influencerId)
        .single();

      if (existing) {
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

      if (error) throw error;

      toast({
        title: "Success",
        description: "Influencer saved to your list",
      });

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
    if (!user) return false;

    try {
      const { data } = await supabase
        .from('saved_influencers')
        .select('id')
        .eq('user_id', user.id)
        .eq('influencer_id', influencerId)
        .single();

      return !!data;
    } catch {
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
