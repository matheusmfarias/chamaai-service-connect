
import { ServiceRequest, Proposal } from "@/types/serviceRequest";

export const mockServiceRequests: ServiceRequest[] = [
  {
    id: 'request-1',
    client_id: 'client-user',
    title: 'Limpeza de apartamento',
    description: 'Preciso de uma faxina completa em apartamento de 70m²',
    category: 'limpeza',
    status: 'pending',
    is_public: true,
    estimated_price: null,
    scheduled_date: new Date().toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    profiles: {
      full_name: 'Cliente Exemplo'
    }
  },
  {
    id: 'request-2',
    client_id: 'client-user',
    title: 'Instalação de tomadas',
    description: 'Preciso instalar 5 tomadas na sala e cozinha',
    category: 'eletrica',
    status: 'pending',
    is_public: false,
    estimated_price: null,
    scheduled_date: new Date(Date.now() + 86400000).toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    profiles: {
      full_name: 'Cliente Exemplo'
    }
  }
];

export const mockProposals: Proposal[] = [
  {
    id: 'proposal-1',
    request_id: 'request-1',
    provider_id: 'provider-user',
    price: 150,
    status: 'pending',
    message: 'Posso fazer o serviço completo incluindo produtos de limpeza.',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    service_providers: {
      id: 'provider-user',
      rating: 4.8,
      profiles: {
        full_name: 'Prestador Exemplo',
        city: 'Rio de Janeiro',
        state: 'RJ'
      }
    }
  }
];
