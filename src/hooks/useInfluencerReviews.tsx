
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from './use-toast';

export interface InfluencerReview {
  id: string;
  user_id: string;
  influencer_id: string;
  campaign_id: string | null;
  rating: number;
  review: string | null;
  created_at: string;
  campaign?: {
    id: string;
    name: string;
  };
}

export const useInfluencerReviews = () => {
  const [reviews, setReviews] = useState<InfluencerReview[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchReviews = async (influencerId?: string) => {
    if (!user) return;

    try {
      let query = supabase
        .from('influencer_reviews')
        .select(`
          *,
          campaign:campaigns (
            id,
            name
          )
        `);

      if (influencerId) {
        query = query.eq('influencer_id', influencerId);
      } else {
        query = query.eq('user_id', user.id);
      }

      const { data, error } = await query;

      if (error) throw error;
      setReviews(data as InfluencerReview[]);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      toast({
        title: "Error",
        description: "Failed to load reviews",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createReview = async (influencerId: string, rating: number, review?: string, campaignId?: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('influencer_reviews')
        .insert({
          user_id: user.id,
          influencer_id: influencerId,
          campaign_id: campaignId,
          rating,
          review,
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Review submitted successfully",
      });

      fetchReviews();
    } catch (error) {
      console.error('Error creating review:', error);
      toast({
        title: "Error",
        description: "Failed to submit review",
        variant: "destructive",
      });
    }
  };

  const updateReview = async (reviewId: string, rating: number, review?: string) => {
    try {
      const { error } = await supabase
        .from('influencer_reviews')
        .update({ rating, review })
        .eq('id', reviewId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Review updated successfully",
      });

      fetchReviews();
    } catch (error) {
      console.error('Error updating review:', error);
      toast({
        title: "Error",
        description: "Failed to update review",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [user]);

  return {
    reviews,
    loading,
    createReview,
    updateReview,
    refetch: fetchReviews,
  };
};
