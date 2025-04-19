
import { motion } from "framer-motion";
import ProviderCard from "@/components/ProviderCard";
import { ServiceProvider } from "@/types/serviceProvider";
import SearchFilters from "@/components/SearchFilters";
import { FilterValues } from "@/components/SearchFilters";
import { CustomPagination } from "@/components/search/CustomPagination";

interface SearchResultsListProps {
  isLoading: boolean;
  error: string | null;
  filteredProviders: ServiceProvider[];
  searchQuery: string;
  onFilterChange: (filters: FilterValues) => void;
  onViewProfile: (providerId: string) => void;
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
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

export const SearchResultsList = ({
  isLoading,
  error,
  filteredProviders,
  searchQuery,
  onFilterChange,
  onViewProfile,
  currentPage,
  itemsPerPage,
  onPageChange
}: SearchResultsListProps) => {
  const totalPages = Math.ceil(filteredProviders.length / itemsPerPage);
  const paginatedProviders = filteredProviders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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

  if (filteredProviders.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center py-16">
        <p className="text-xl text-gray-500 mb-4">Nenhum resultado encontrado para "{searchQuery}".</p>
        <p className="text-gray-600">Tente buscar por outro termo ou categoria.</p>
      </div>
    );
  }

  return (
    <>
      <SearchFilters onFilterChange={onFilterChange} />
      
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
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {paginatedProviders.map((provider) => (
          <ProviderCard 
            key={provider.id}
            provider={provider}
            onViewProfile={() => onViewProfile(provider.id)}
          />
        ))}
      </motion.div>
      
      {totalPages > 1 && (
        <CustomPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </>
  );
};
