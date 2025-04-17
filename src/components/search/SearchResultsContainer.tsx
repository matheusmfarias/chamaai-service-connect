
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchHeader from '@/components/SearchHeader';
import SearchResultsSection from '@/components/SearchResultsSection';
import { useServiceProviders, ServiceProvider } from '@/hooks/useServiceProviders';
import { filterProviders } from '@/utils/searchUtils';
import type { FilterValues } from '@/components/search/types';
import { useLoginModal } from './LoginModalProvider';
import { useAuth } from '@/contexts/AuthContext';

interface SearchResultsContainerProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const SearchResultsContainer = ({
  searchQuery,
  onSearchChange
}: SearchResultsContainerProps) => {
  const [filters, setFilters] = useState<FilterValues>({
    location: 'all',
    rating: 'all',
    priceRange: 'all',
    sortBy: 'relevance'
  });
  
  const { providers, isLoading, error } = useServiceProviders(undefined, searchQuery);
  const [filteredProviders, setFilteredProviders] = useState<ServiceProvider[]>([]);
  const { showLoginModal } = useLoginModal();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (providers) {
      console.log("Número de prestadores antes da filtragem:", providers.length);
      console.log("Prestadores encontrados:", providers);
      const filtered = filterProviders(providers, filters);
      console.log("Número de prestadores após a filtragem:", filtered.length);
      setFilteredProviders(filtered);
    }
  }, [providers, filters]);
  
  const handleFilterChange = (newFilters: FilterValues) => {
    console.log("Filtros aplicados:", newFilters);
    setFilters(newFilters);
  };
  
  const handleViewProfile = (providerId: string) => {
    if (!user) {
      showLoginModal(providerId);
    } else {
      navigate(`/prestador/${providerId}`);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Update URL parameters if needed
    console.log("Search form submitted with query:", searchQuery);
  };
  
  return (
    <>
      <SearchHeader 
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        onSubmit={handleSubmit}
      />
      
      <SearchResultsSection
        isLoading={isLoading}
        error={error}
        providers={filteredProviders}
        searchQuery={searchQuery}
        onFilterChange={handleFilterChange}
        onViewProfile={handleViewProfile}
      />
    </>
  );
};

export default SearchResultsContainer;
