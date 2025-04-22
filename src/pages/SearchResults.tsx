
import { useState, useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import LoginModal from "@/components/LoginModal";
import { useServiceProviders } from "@/hooks/useServiceProviders";
import { useAuth } from "@/contexts/AuthContext";
import { SearchHeader } from "@/components/search/SearchHeader";
import { SearchResultsList } from "@/components/search/SearchResultsList";
import { FilterValues } from "@/components/SearchFilters";

const ITEMS_PER_PAGE = 6;

const SearchResults = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useAuth();
  
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [filteredProviders, setFilteredProviders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [selectedProviderId, setSelectedProviderId] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterValues>({
    location: "all",
    rating: "all",
    priceRange: "all",
    sortBy: "relevance"
  });
  
  const { providers, isLoading, error } = useServiceProviders();
  
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (searchQuery) {
      params.set("q", searchQuery);
    } else {
      params.delete("q");
    }
    setSearchParams(params);
  }, [searchQuery, setSearchParams]);
  
  useEffect(() => {
    if (!providers.length) {
      setFilteredProviders([]);
      return;
    }
    
    let results = providers;
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      
      results = providers.filter(provider => {
        const categoryMatch = provider.category.toLowerCase().includes(query);
        const descriptionMatch = provider.description?.toLowerCase().includes(query) || false;
        const nameMatch = provider.profiles.full_name.toLowerCase().includes(query);
        
        const relatedTerms: Record<string, string[]> = {
          "faxina": ["faxineira", "limpeza", "limpador", "diarista"],
          "eletrica": ["eletricista", "eletrico", "instalação"],
          "pintura": ["pintor", "pintora"]
        };
        
        let relatedMatch = false;
        
        for (const [category, terms] of Object.entries(relatedTerms)) {
          if (provider.category.toLowerCase() === category && 
              terms.some(term => query.includes(term))) {
            relatedMatch = true;
            break;
          }
          
          if (terms.includes(query) && provider.category.toLowerCase() === category) {
            relatedMatch = true;
            break;
          }
        }
        
        return categoryMatch || descriptionMatch || nameMatch || relatedMatch;
      });
    }
    
    if (filters.location !== "all") {
      results = results.filter(provider => {
        const locationKey = filters.location === "sao_paulo" ? "São Paulo" :
                          filters.location === "guarulhos" ? "Guarulhos" :
                          filters.location === "osasco" ? "Osasco" : "";
        
        return provider.profiles.city?.includes(locationKey);
      });
    }
    
    if (filters.rating !== "all") {
      const minRating = parseInt(filters.rating.replace("+", ""));
      results = results.filter(provider => provider.rating >= minRating);
    }
    
    if (filters.priceRange !== "all") {
      results = results.filter(provider => {
        if (filters.priceRange === "low" && provider.rate_per_hour < 40) return true;
        if (filters.priceRange === "medium" && provider.rate_per_hour >= 40 && provider.rate_per_hour <= 80) return true;
        if (filters.priceRange === "high" && provider.rate_per_hour > 80) return true;
        return false;
      });
    }
    
    if (filters.sortBy === "rating") {
      results = [...results].sort((a, b) => b.rating - a.rating);
    } else if (filters.sortBy === "recent") {
      results = [...results].sort((a, b) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    }
    
    setFilteredProviders(results);
  }, [searchQuery, providers, filters]);
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (searchQuery) {
      params.set("q", searchQuery);
    } else {
      params.delete("q");
    }
    setSearchParams(params);
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
        onSearchSubmit={handleSearch}
      />
      
      <motion.section 
        initial="hidden"
        animate="visible"
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
        className="py-12 bg-gray-50"
      >
        <div className="container-custom">
          <SearchResultsList 
            isLoading={isLoading}
            // Fix the error by converting error object to string if it exists
            error={error ? error.message : null}
            filteredProviders={filteredProviders}
            searchQuery={searchQuery}
            onFilterChange={handleFilterChange}
            onViewProfile={handleViewProfile}
            currentPage={currentPage}
            itemsPerPage={ITEMS_PER_PAGE}
            onPageChange={handlePageChange}
          />
          
          {showLoginModal && (
            <LoginModal 
              isOpen={showLoginModal}
              onClose={handleCloseModal}
              onLogin={handleLogin}
              onSignUp={handleSignUp}
            />
          )}
        </div>
      </motion.section>
    </Layout>
  );
};

export default SearchResults;
