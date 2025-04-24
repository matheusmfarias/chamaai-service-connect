
export interface ServiceRequest {
  id: string;
  client_id: string;
  title: string;
  description: string;
  category: string;
  status: 'pending' | 'assigned' | 'completed' | 'cancelled';
  is_public: boolean;
  estimated_price: number | null;
  scheduled_date: string;
  created_at: string;
  updated_at: string;
  profiles?: {
    full_name: string;
  };
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
