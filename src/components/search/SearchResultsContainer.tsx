
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLoginModal } from './LoginModalProvider';
import { useServiceProviders } from '@/hooks/useServiceProviders';
import { filterProviders } from '@/utils/searchUtils';
import SearchHeader from '@/components/SearchHeader';
import SearchResultsSection from '@/components/SearchResultsSection';
import type { FilterValues } from './types';

interface SearchResultsContainerProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const SearchResultsContainer = ({ searchQuery, onSearchChange }: SearchResultsContainerProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showLoginModal } = useLoginModal();
  const [filters, setFilters] = useState<FilterValues>({
    location: "all",
    rating: "all",
    priceRange: "all",
    sortBy: "relevance"
  });
  
  const { providers, isLoading, error } = useServiceProviders(undefined, searchQuery);
  const filteredProviders = filterProviders(providers, filters);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };
  
  const handleFilterChange = (newFilters: FilterValues) => {
    setFilters(newFilters);
  };
  
  const handleViewProfile = (providerId: string) => {
    if (user) {
      navigate(`/prestador/${providerId}`);
    } else {
      showLoginModal(providerId);
    }
  };
  
  return (
    <>
      <SearchHeader 
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        onSubmit={handleSearch}
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
