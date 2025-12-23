-- Create saathi_details table for Saathi-specific information
CREATE TABLE public.saathi_details (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  hourly_rate INTEGER NOT NULL DEFAULT 299,
  topics TEXT[] DEFAULT '{}',
  languages TEXT[] DEFAULT '{"Hindi", "English"}',
  bio TEXT,
  is_verified BOOLEAN DEFAULT false,
  is_available BOOLEAN DEFAULT true,
  govt_id_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Create availability slots table
CREATE TABLE public.availability_slots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  saathi_id UUID REFERENCES public.saathi_details(id) ON DELETE CASCADE NOT NULL,
  day_of_week INTEGER NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6),
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Create booking status enum
CREATE TYPE public.booking_status AS ENUM ('pending', 'confirmed', 'completed', 'cancelled', 'refunded');

-- Create payment status enum
CREATE TYPE public.payment_status AS ENUM ('pending', 'paid', 'failed', 'refunded');

-- Create bookings table
CREATE TABLE public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  seeker_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  saathi_id UUID REFERENCES public.saathi_details(id) ON DELETE CASCADE NOT NULL,
  booking_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  duration_hours INTEGER NOT NULL DEFAULT 1,
  total_amount INTEGER NOT NULL,
  status booking_status DEFAULT 'pending' NOT NULL,
  payment_status payment_status DEFAULT 'pending' NOT NULL,
  stripe_payment_intent_id TEXT,
  meeting_location TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Enable RLS
ALTER TABLE public.saathi_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.availability_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Saathi details policies
CREATE POLICY "Anyone can view verified saathi details"
  ON public.saathi_details FOR SELECT
  USING (is_verified = true OR auth.uid() = user_id);

CREATE POLICY "Saathis can insert their own details"
  ON public.saathi_details FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Saathis can update their own details"
  ON public.saathi_details FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Availability slots policies
CREATE POLICY "Anyone can view availability slots"
  ON public.availability_slots FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Saathis can manage their own slots"
  ON public.availability_slots FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.saathi_details 
      WHERE id = saathi_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Saathis can update their own slots"
  ON public.availability_slots FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.saathi_details 
      WHERE id = saathi_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Saathis can delete their own slots"
  ON public.availability_slots FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.saathi_details 
      WHERE id = saathi_id AND user_id = auth.uid()
    )
  );

-- Bookings policies
CREATE POLICY "Users can view their own bookings"
  ON public.bookings FOR SELECT
  TO authenticated
  USING (
    seeker_id = auth.uid() OR 
    EXISTS (
      SELECT 1 FROM public.saathi_details 
      WHERE id = saathi_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Seekers can create bookings"
  ON public.bookings FOR INSERT
  TO authenticated
  WITH CHECK (seeker_id = auth.uid());

CREATE POLICY "Users can update their own bookings"
  ON public.bookings FOR UPDATE
  TO authenticated
  USING (
    seeker_id = auth.uid() OR 
    EXISTS (
      SELECT 1 FROM public.saathi_details 
      WHERE id = saathi_id AND user_id = auth.uid()
    )
  );

-- Add triggers for updated_at
CREATE TRIGGER update_saathi_details_updated_at
  BEFORE UPDATE ON public.saathi_details
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at
  BEFORE UPDATE ON public.bookings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Auto-create saathi_details when user signs up as saathi
CREATE OR REPLACE FUNCTION public.handle_new_saathi_role()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.role = 'saathi' THEN
    INSERT INTO public.saathi_details (user_id)
    VALUES (NEW.user_id)
    ON CONFLICT (user_id) DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_saathi_role_created
  AFTER INSERT ON public.user_roles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_saathi_role();