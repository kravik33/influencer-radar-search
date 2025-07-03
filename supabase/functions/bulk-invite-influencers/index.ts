
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface BulkInviteRequest {
  campaign_id: string;
  influencer_ids: string[];
  notes?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization') ?? '' },
        },
      }
    );

    const { campaign_id, influencer_ids, notes }: BulkInviteRequest = await req.json();

    console.log('Bulk inviting influencers:', { campaign_id, influencer_ids, notes });

    // Verify user owns the campaign
    const { data: campaign, error: campaignError } = await supabase
      .from('campaigns')
      .select('user_id')
      .eq('id', campaign_id)
      .single();

    if (campaignError) {
      console.error('Campaign verification error:', campaignError);
      throw new Error('Campaign not found');
    }

    // Create bulk invites
    const invites = influencer_ids.map(influencer_id => ({
      campaign_id,
      influencer_id,
      notes,
    }));

    const { data, error } = await supabase
      .from('campaign_invites')
      .insert(invites)
      .select();

    if (error) {
      console.error('Error creating bulk invites:', error);
      throw error;
    }

    console.log('Bulk invites created successfully:', data);

    // Create notification for user
    await supabase.functions.invoke('send-notification', {
      body: {
        user_id: campaign.user_id,
        title: 'Bulk Invites Sent',
        message: `Successfully sent ${influencer_ids.length} campaign invites`,
        type: 'success'
      }
    });

    return new Response(
      JSON.stringify({ success: true, invites: data }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  } catch (error) {
    console.error('Error in bulk-invite-influencers function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  }
};

serve(handler);
