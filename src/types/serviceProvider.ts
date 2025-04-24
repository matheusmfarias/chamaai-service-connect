
export interface ServiceProvider {
  id: string;
  user_id: string;
  category_id: string;
  description: string | null;
  rate_per_hour: number;
  availability: string[];
  rating: number;
  total_reviews: number;
  created_at: string;
  // Add properties referenced in the code but not defined in type
  category: string;
  is_verified?: boolean;
  response_time?: string;
  services_completed?: number;
  profiles: {
    full_name: string;
    phone: string | null;
    city: string | null;
    state: string | null;
    avatar_url: string | null;
  };
  categories: {
    name: string;
    slug: string;
    icon: string;
  };
}
