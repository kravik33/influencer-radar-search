
-- Enable Row Level Security on existing tables that will need user-specific access
ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_influencers ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for campaigns (users can only see their own campaigns)
CREATE POLICY "Users can view their own campaigns" 
  ON public.campaigns 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own campaigns" 
  ON public.campaigns 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own campaigns" 
  ON public.campaigns 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own campaigns" 
  ON public.campaigns 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Create RLS policies for saved_influencers (users can only see their own saved influencers)
CREATE POLICY "Users can view their own saved influencers" 
  ON public.saved_influencers 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can save influencers" 
  ON public.saved_influencers 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own saved influencers" 
  ON public.saved_influencers 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Allow public read access to influencers table (so users can browse all influencers)
ALTER TABLE public.influencers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view influencers" 
  ON public.influencers 
  FOR SELECT 
  TO public
  USING (true);
