
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { MobileFilterSheet } from "./search/MobileFilterSheet";
import { FilterContent } from "./search/FilterContent";
import type { FilterValues } from "./search/types";

interface SearchFiltersProps {
  onFilterChange: (filters: FilterValues) => void;
}

const SearchFilters = ({ onFilterChange }: SearchFiltersProps) => {
  const isMobile = useIsMobile();
  const [filters, setFilters] = useState<FilterValues>({
    location: "all",
    rating: "all",
    priceRange: "all",
    sortBy: "relevance"
  });
  
  const handleFilterChange = (key: keyof FilterValues, value: string) => {
    const newFilters = {
      ...filters,
      [key]: value
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };
  
  if (isMobile) {
    return <MobileFilterSheet filters={filters} onFilterChange={handleFilterChange} />;
  }
  
  return (
    <div className="mb-5 bg-white p-4 rounded-lg border shadow-sm">
      <FilterContent filters={filters} onFilterChange={handleFilterChange} />
    </div>
  );
};

export default SearchFilters;
