
import { useState, useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/Layout";
import LoginModal from "@/components/LoginModal";
import SearchHeader from "@/components/SearchHeader";
import SearchResultsSection from "@/components/SearchResultsSection";
import { useServiceProviders } from "@/hooks/useServiceProviders";
import { filterProviders } from "@/utils/searchUtils";
import type { FilterValues } from "@/components/SearchFilters";

const SearchResults = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useAuth();
  
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [selectedProviderId, setSelectedProviderId] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterValues>({
    location: "all",
    rating: "all",
    priceRange: "all",
    sortBy: "relevance"
  });
  
  const { providers, isLoading, error } = useServiceProviders(undefined, searchQuery);
  const filteredProviders = filterProviders(providers, filters);
  
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (searchQuery) {
      params.set("q", searchQuery);
    } else {
      params.delete("q");
    }
    setSearchParams(params);
  }, [searchQuery, setSearchParams]);
  
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
      setSelectedProviderId(providerId);
      setShowLoginModal(true);
    }
  };
  
  const handleCloseModal = () => {
    setShowLoginModal(false);
    setSelectedProviderId(null);
  };
  
  const handleLogin = () => {
    navigate("/login");
  };
  
  const handleSignUp = () => {
    navigate("/cadastro");
  };
  
  return (
    <Layout>
      <SearchHeader 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
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
      
      {showLoginModal && (
        <LoginModal 
          isOpen={showLoginModal}
          onClose={handleCloseModal}
          onLogin={handleLogin}
          onSignUp={handleSignUp}
        />
      )}
    </Layout>
  );
};

export default SearchResults;
