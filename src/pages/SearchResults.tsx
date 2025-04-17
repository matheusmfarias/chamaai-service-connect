import { useState, useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ProviderCard from "@/components/ProviderCard";
import LoginModal from "@/components/LoginModal";
import SearchFilters, { FilterValues } from "@/components/SearchFilters";
import { useServiceProviders, ServiceProvider } from "@/hooks/useServiceProviders";
import { useAuth } from "@/contexts/AuthContext";

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

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
  const [filteredProviders, setFilteredProviders] = useState<ServiceProvider[]>([]);
  
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
    
    let results = [...providers];
    
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
  }, [providers, filters]);
  
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
      <motion.section 
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="bg-gradient-to-r from-chamaai-blue to-chamaai-lightblue text-white py-8"
      >
        <div className="container-custom">
          <h1 className="text-3xl font-bold mb-4">Resultados da Busca</h1>
          <form onSubmit={handleSearch} className="relative">
            <Input
              type="text"
              placeholder="Busque por serviços ou profissionais..."
              className="bg-white text-gray-800 pl-10 pr-4 py-6 rounded-lg w-full focus:ring-2 focus:ring-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Button 
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-chamaai-blue hover:bg-chamaai-lightblue"
            >
              Buscar
            </Button>
          </form>
        </div>
      </motion.section>
      
      <motion.section 
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="py-12 bg-gray-50"
      >
        <div className="container-custom">
          {!isLoading && !error && filteredProviders.length > 0 && (
            <SearchFilters onFilterChange={handleFilterChange} />
          )}
          
          {isLoading ? (
            <div className="flex justify-center items-center py-16">
              <p className="text-xl text-gray-500">Carregando resultados...</p>
            </div>
          ) : error ? (
            <div className="flex justify-center items-center py-16">
              <p className="text-xl text-red-500">Erro ao carregar resultados.</p>
            </div>
          ) : filteredProviders.length === 0 ? (
            <div className="flex flex-col justify-center items-center py-16">
              <p className="text-xl text-gray-500 mb-4">Nenhum resultado encontrado para "{searchQuery}".</p>
              <p className="text-gray-600">Tente buscar por outro termo ou categoria.</p>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-2">
                  {filteredProviders.length} {filteredProviders.length === 1 ? "resultado" : "resultados"} encontrados
                  {searchQuery && ` para "${searchQuery}"`}
                </h2>
                <p className="text-gray-600">
                  Encontre o profissional ideal para o seu serviço
                </p>
              </div>
              
              <motion.div 
                variants={staggerContainer}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredProviders.map((provider) => (
                  <ProviderCard 
                    key={provider.id}
                    provider={provider}
                    onViewProfile={() => handleViewProfile(provider.id)}
                  />
                ))}
              </motion.div>
            </>
          )}
        </div>
      </motion.section>
      
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
