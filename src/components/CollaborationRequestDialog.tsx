
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MessageCircle } from 'lucide-react';
import { useCollaborationRequests } from '@/hooks/useCollaborationRequests';

interface Campaign {
  id: string;
  name: string;
}

interface CollaborationRequestDialogProps {
  influencerId: string;
  campaigns: Campaign[];
  onRequest?: () => void;
}

const CollaborationRequestDialog = ({ influencerId, campaigns, onRequest }: CollaborationRequestDialogProps) => {
  const [open, setOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<string>('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { createRequest } = useCollaborationRequests();

  const handleRequest = async () => {
    if (!message.trim()) return;

    setLoading(true);
    try {
      await createRequest(influencerId, message, selectedCampaign || undefined);
      setOpen(false);
      setSelectedCampaign('');
      setMessage('');
      onRequest?.();
    } catch (error) {
      console.error('Error creating collaboration request:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <MessageCircle className="w-4 h-4 mr-2" />
          Request Collaboration
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Request Collaboration</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="campaign">Campaign (Optional)</Label>
            <Select value={selectedCampaign} onValueChange={setSelectedCampaign}>
              <SelectTrigger>
                <SelectValue placeholder="Select a campaign (optional)" />
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
            <Label htmlFor="message">Message *</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Describe your collaboration proposal..."
              rows={4}
              required
            />
          </div>
          
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleRequest} 
              disabled={!message.trim() || loading}
            >
              {loading ? 'Sending...' : 'Send Request'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CollaborationRequestDialog;
