
export interface ServiceRequest {
  id: string;
  client_id: string;
  title: string;
  description: string;
  category_id: string | null;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  is_public: boolean;
  location: string | null;
  scheduled_date: string | null;
  created_at: string;
  profiles?: {
    full_name: string;
  };
  categories?: {
    name: string;
    slug: string;
    icon: string | null;
  };
  // For backward compatibility
  category?: string;
}

export interface Proposal {
  id: string;
  request_id: string;
  provider_id: string;
  price: number;
  status: 'pending' | 'accepted' | 'rejected';
  message: string;
  created_at: string;
  updated_at: string;
  service_providers?: {
    id: string;
    rating: number;
    profiles: {
      full_name: string;
      city: string | null;
      state: string | null;
    };
  };
}
