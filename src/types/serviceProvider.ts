
export interface ServiceProvider {
  id: string;
  category: string;
  description: string | null;
  rate_per_hour: number;
  is_verified: boolean;
  rating: number;
  total_reviews: number;
  services_completed: number;
  response_time: string | null;
  created_at: string;
  updated_at: string;
  profiles: {
    full_name: string;
    phone: string | null;
    city: string | null;
    state: string | null;
  };
}
