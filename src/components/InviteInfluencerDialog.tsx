
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UserPlus } from 'lucide-react';
import { useCampaignInvites } from '@/hooks/useCampaignInvites';

interface Campaign {
  id: string;
  name: string;
}

interface InviteInfluencerDialogProps {
  influencerId: string;
  campaigns: Campaign[];
  onInvite?: () => void;
}

const InviteInfluencerDialog = ({ influencerId, campaigns, onInvite }: InviteInfluencerDialogProps) => {
  const [open, setOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<string>('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const { inviteInfluencer } = useCampaignInvites();

  const handleInvite = async () => {
    if (!selectedCampaign) return;

    setLoading(true);
    try {
      await inviteInfluencer(selectedCampaign, influencerId, notes);
      setOpen(false);
      setSelectedCampaign('');
      setNotes('');
      onInvite?.();
    } catch (error) {
      console.error('Error inviting influencer:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <UserPlus className="w-4 h-4 mr-2" />
          Invite to Campaign
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Invite Influencer to Campaign</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="campaign">Select Campaign</Label>
            <Select value={selectedCampaign} onValueChange={setSelectedCampaign}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a campaign" />
              </SelectTrigger>
              <SelectContent>
                {campaigns.map((campaign) => (
                  <SelectItem key={campaign.id} value={campaign.id}>
                    {campaign.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="notes">Additional Notes (Optional)</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any specific requirements or messages..."
              rows={3}
            />
          </div>
          
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleInvite} 
              disabled={!selectedCampaign || loading}
            >
              {loading ? 'Sending...' : 'Send Invite'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InviteInfluencerDialog;
