
-- Enable RLS on the users table (if not already enabled)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for users table
CREATE POLICY "Users can view their own profile" 
  ON public.users 
  FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
  ON public.users 
  FOR UPDATE 
  USING (auth.uid() = id);

-- Update the influencers table policy to require authentication
-- First drop the existing policy that allows public access
DROP POLICY IF EXISTS "Anyone can view influencers" ON public.influencers;

-- Create new policy that only allows authenticated users to view influencers
CREATE POLICY "Authenticated users can view influencers" 
  ON public.influencers 
  FOR SELECT 
  TO authenticated
  USING (true);

-- Ensure all other tables have proper RLS policies
-- The campaigns and saved_influencers tables already have proper RLS policies
-- but let's make sure they're secure

-- Optional: Add a policy to allow admins to manage influencers data
-- (You can skip this if you don't need admin access through the app)
CREATE POLICY "Admins can manage influencers" 
  ON public.influencers 
  FOR ALL 
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() 
      AND role = 'admin'
    )
  );
