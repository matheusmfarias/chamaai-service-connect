
-- Function to check if an email is already in use
CREATE OR REPLACE FUNCTION public.is_email_available(email TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN NOT EXISTS (
    SELECT 1 FROM auth.users WHERE auth.users.email = is_email_available.email
  );
END;
$$;
