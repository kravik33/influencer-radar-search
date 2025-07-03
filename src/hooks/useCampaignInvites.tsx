
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from './use-toast';

export interface CampaignInvite {
  id: string;
  campaign_id: string;
  influencer_id: string;
  status: string;
  invited_at: string;
  responded_at: string | null;
  notes: string | null;
  influencer: {
    id: string;
    name: string;
    username: string;
    platform: string;
    avatar_url: string;
  };
}

export const useCampaignInvites = () => {
  const [invites, setInvites] = useState<CampaignInvite[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchInvites = async (campaignId?: string) => {
    if (!user) return;

    try {
      let query = supabase
        .from('campaign_invites')
        .select(`
          *,
          influencer:influencers (
            id,
            name,
            username,
            platform,
            avatar_url
          )
        `);

      if (campaignId) {
        query = query.eq('campaign_id', campaignId);
      }

      const { data, error } = await query;

      if (error) throw error;
      setInvites(data as CampaignInvite[]);
    } catch (error) {
      console.error('Error fetching invites:', error);
      toast({
        title: "Error",
        description: "Failed to load campaign invites",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const inviteInfluencer = async (campaignId: string, influencerId: string, notes?: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('campaign_invites')
        .insert({
          campaign_id: campaignId,
          influencer_id: influencerId,
          notes,
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Influencer invited to campaign",
      });

      fetchInvites(campaignId);
    } catch (error) {
      console.error('Error inviting influencer:', error);
      toast({
        title: "Error",
        description: "Failed to invite influencer",
        variant: "destructive",
      });
    }
  };

  const updateInviteStatus = async (inviteId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('campaign_invites')
        .update({ 
          status,
          responded_at: new Date().toISOString()
        })
        .eq('id', inviteId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Invite status updated",
      });

      fetchInvites();
    } catch (error) {
      console.error('Error updating invite:', error);
      toast({
        title: "Error",
        description: "Failed to update invite",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchInvites();
  }, [user]);

  return {
    invites,
    loading,
    inviteInfluencer,
    updateInviteStatus,
    refetch: fetchInvites,
  };
};
