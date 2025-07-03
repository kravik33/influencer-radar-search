
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from './use-toast';

export interface CollaborationRequest {
  id: string;
  user_id: string;
  influencer_id: string;
  campaign_id: string | null;
  message: string;
  status: string;
  created_at: string;
  updated_at: string;
  influencer: {
    id: string;
    name: string;
    username: string;
    platform: string;
    avatar_url: string;
  };
  campaign?: {
    id: string;
    name: string;
  };
}

export const useCollaborationRequests = () => {
  const [requests, setRequests] = useState<CollaborationRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchRequests = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('collaboration_requests')
        .select(`
          *,
          influencer:influencers (
            id,
            name,
            username,
            platform,
            avatar_url
          ),
          campaign:campaigns (
            id,
            name
          )
        `)
        .eq('user_id', user.id);

      if (error) throw error;
      setRequests(data as CollaborationRequest[]);
    } catch (error) {
      console.error('Error fetching collaboration requests:', error);
      toast({
        title: "Error",
        description: "Failed to load collaboration requests",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createRequest = async (influencerId: string, message: string, campaignId?: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('collaboration_requests')
        .insert({
          user_id: user.id,
          influencer_id: influencerId,
          campaign_id: campaignId,
          message,
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Collaboration request sent",
      });

      fetchRequests();
    } catch (error) {
      console.error('Error creating collaboration request:', error);
      toast({
        title: "Error",
        description: "Failed to send collaboration request",
        variant: "destructive",
      });
    }
  };

  const updateRequestStatus = async (requestId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('collaboration_requests')
        .update({ 
          status,
          updated_at: new Date().toISOString()
        })
        .eq('id', requestId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Request status updated",
      });

      fetchRequests();
    } catch (error) {
      console.error('Error updating request:', error);
      toast({
        title: "Error",
        description: "Failed to update request",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [user]);

  return {
    requests,
    loading,
    createRequest,
    updateRequestStatus,
    refetch: fetchRequests,
  };
};
