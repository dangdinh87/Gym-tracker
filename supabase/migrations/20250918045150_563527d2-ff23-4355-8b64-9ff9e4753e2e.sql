-- Create profiles table for user data
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create workouts table
CREATE TABLE public.workouts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  date DATE NOT NULL,
  duration INTEGER, -- in minutes
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create exercises table for workout exercises
CREATE TABLE public.exercises (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workout_id UUID NOT NULL REFERENCES public.workouts(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  sets JSONB NOT NULL DEFAULT '[]', -- array of set objects {weight, reps, completed}
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create nutrition entries table
CREATE TABLE public.nutrition_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  food_name TEXT NOT NULL,
  calories NUMERIC NOT NULL,
  protein NUMERIC NOT NULL,
  carbs NUMERIC NOT NULL,
  fat NUMERIC NOT NULL,
  quantity NUMERIC DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create nutrition goals table
CREATE TABLE public.nutrition_goals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  daily_calories INTEGER NOT NULL DEFAULT 2000,
  daily_protein INTEGER NOT NULL DEFAULT 150,
  daily_carbs INTEGER NOT NULL DEFAULT 250,
  daily_fat INTEGER NOT NULL DEFAULT 65,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nutrition_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nutrition_goals ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view own profile" ON public.profiles
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile" ON public.profiles
FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own profile" ON public.profiles
FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for workouts
CREATE POLICY "Users can view own workouts" ON public.workouts
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own workouts" ON public.workouts
FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own workouts" ON public.workouts
FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own workouts" ON public.workouts
FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for exercises
CREATE POLICY "Users can view own exercises" ON public.exercises
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.workouts 
    WHERE workouts.id = exercises.workout_id 
    AND workouts.user_id = auth.uid()
  )
);

CREATE POLICY "Users can insert own exercises" ON public.exercises
FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.workouts 
    WHERE workouts.id = exercises.workout_id 
    AND workouts.user_id = auth.uid()
  )
);

CREATE POLICY "Users can update own exercises" ON public.exercises
FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM public.workouts 
    WHERE workouts.id = exercises.workout_id 
    AND workouts.user_id = auth.uid()
  )
);

CREATE POLICY "Users can delete own exercises" ON public.exercises
FOR DELETE USING (
  EXISTS (
    SELECT 1 FROM public.workouts 
    WHERE workouts.id = exercises.workout_id 
    AND workouts.user_id = auth.uid()
  )
);

-- RLS Policies for nutrition entries
CREATE POLICY "Users can view own nutrition entries" ON public.nutrition_entries
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own nutrition entries" ON public.nutrition_entries
FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own nutrition entries" ON public.nutrition_entries
FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own nutrition entries" ON public.nutrition_entries
FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for nutrition goals
CREATE POLICY "Users can view own nutrition goals" ON public.nutrition_goals
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own nutrition goals" ON public.nutrition_goals
FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own nutrition goals" ON public.nutrition_goals
FOR UPDATE USING (auth.uid() = user_id);

-- Create triggers for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_workouts_updated_at
  BEFORE UPDATE ON public.workouts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_nutrition_goals_updated_at
  BEFORE UPDATE ON public.nutrition_goals
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, display_name)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'display_name');
  
  INSERT INTO public.nutrition_goals (user_id)
  VALUES (NEW.id);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile and goals when user signs up
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();