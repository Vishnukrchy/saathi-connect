-- Drop the existing restrictive policy
DROP POLICY IF EXISTS "Anyone can view verified saathi details" ON public.saathi_details;

-- Create new policy that allows viewing all available saathis
CREATE POLICY "Anyone can view available saathi details" 
ON public.saathi_details 
FOR SELECT 
USING (is_available = true OR auth.uid() = user_id);