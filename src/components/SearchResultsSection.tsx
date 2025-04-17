import { motion } from "framer-motion";
import { ServiceProvider } from "@/hooks/useServiceProviders";
import SearchFilters from "@/components/SearchFilters";
import ProviderCard from "@/components/ProviderCard";
import type { FilterValues } from "@/components/search/types";

interface SearchResultsSectionProps {
  isLoading: boolean;
  error: string | null;
  providers: ServiceProvider[];
  searchQuery: string;
  onFilterChange: (filters: FilterValues) => void;
  onViewProfile: (providerId: string) => void;
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const SearchResultsSection = ({
  isLoading,
  error,
  providers,
  searchQuery,
  onFilterChange,
  onViewProfile
}: SearchResultsSectionProps) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-16">
        <p className="text-xl text-gray-500">Carregando resultados...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-16">
        <p className="text-xl text-red-500">Erro ao carregar resultados.</p>
      </div>
    );
  }

  if (providers.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center py-16">
        <p className="text-xl text-gray-500 mb-4">
          Nenhum resultado encontrado {searchQuery && `para "${searchQuery}"`}.
        </p>
        <p className="text-gray-600">Tente buscar por outro termo ou categoria.</p>
      </div>
    );
  }

  return (
    <motion.section 
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1 }
      }}
      className="py-12 bg-gray-50"
    >
      <div className="container-custom">
        <SearchFilters onFilterChange={onFilterChange} />
        
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">
            {providers.length} {providers.length === 1 ? "resultado" : "resultados"} encontrados
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
          {providers.map((provider) => (
            <ProviderCard 
              key={provider.id}
              provider={provider}
              onViewProfile={() => onViewProfile(provider.id)}
            />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default SearchResultsSection;
