-- Enable public read access to exercises table since it contains reference data
-- that should be accessible to all authenticated users

-- Create a policy to allow all authenticated users to read exercises
CREATE POLICY "Exercises are viewable by all authenticated users" 
ON public.exercises 
FOR SELECT 
USING (true);

-- Note: We don't need INSERT, UPDATE, DELETE policies for exercises 
-- since this is reference data that users should only read