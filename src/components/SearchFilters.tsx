
import { useState } from "react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { 
  SlidersHorizontal, 
  MapPin, 
  Star, 
  DollarSign,
  ArrowDownAZ
} from "lucide-react";
import { 
  ToggleGroup, 
  ToggleGroupItem 
} from "@/components/ui/toggle-group";
import { useIsMobile } from "@/hooks/use-mobile";
import { Separator } from "@/components/ui/separator";

// Interface for filter values
export interface FilterValues {
  location: string;
  rating: string;
  priceRange: string;
  sortBy: string;
}

interface SearchFiltersProps {
  onFilterChange: (filters: FilterValues) => void;
}

// Predefined options for the filters
const locations = [
  { value: "all", label: "Todos os locais" },
  { value: "sao_paulo", label: "São Paulo, SP" },
  { value: "guarulhos", label: "Guarulhos, SP" },
  { value: "osasco", label: "Osasco, SP" }
];

const ratings = [
  { value: "all", label: "Todas avaliações" },
  { value: "3+", label: "3+ estrelas" },
  { value: "4+", label: "4+ estrelas" },
  { value: "5", label: "5 estrelas" }
];

const priceRanges = [
  { value: "all", label: "Qualquer preço" },
  { value: "low", label: "Econômico ($)" },
  { value: "medium", label: "Intermediário ($$)" },
  { value: "high", label: "Premium ($$$)" }
];

const sortOptions = [
  { value: "relevance", label: "Mais relevantes" },
  { value: "rating", label: "Melhor avaliados" },
  { value: "recent", label: "Mais recentes" }
];

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
  
  const FiltersContent = () => (
    <div className={`grid ${isMobile ? 'grid-cols-1 gap-4' : 'grid-cols-4 gap-3'}`}>
      <div>
        <label className="text-sm font-medium mb-1 block">
          <MapPin className="w-4 h-4 inline-block mr-1" /> Localização
        </label>
        <Select 
          value={filters.location}
          onValueChange={(value) => handleFilterChange("location", value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecione a localização" />
          </SelectTrigger>
          <SelectContent>
            {locations.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <label className="text-sm font-medium mb-1 block">
          <Star className="w-4 h-4 inline-block mr-1" /> Avaliação mínima
        </label>
        <Select 
          value={filters.rating}
          onValueChange={(value) => handleFilterChange("rating", value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecione a avaliação" />
          </SelectTrigger>
          <SelectContent>
            {ratings.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <label className="text-sm font-medium mb-1 block">
          <DollarSign className="w-4 h-4 inline-block mr-1" /> Faixa de preço
        </label>
        <Select 
          value={filters.priceRange}
          onValueChange={(value) => handleFilterChange("priceRange", value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecione o preço" />
          </SelectTrigger>
          <SelectContent>
            {priceRanges.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <label className="text-sm font-medium mb-1 block">
          <ArrowDownAZ className="w-4 h-4 inline-block mr-1" /> Ordenar por
        </label>
        <Select 
          value={filters.sortBy}
          onValueChange={(value) => handleFilterChange("sortBy", value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Ordenar por" />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
  
  // Mobile filters in a slide-out sheet
  if (isMobile) {
    return (
      <div className="mb-5">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full">
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filtrar e ordenar resultados
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[80vh]">
            <SheetHeader>
              <SheetTitle>Filtros de Busca</SheetTitle>
            </SheetHeader>
            <div className="py-4">
              <FiltersContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    );
  }
  
  // Desktop horizontal filters
  return (
    <div className="mb-5 bg-white p-4 rounded-lg border shadow-sm">
      <FiltersContent />
    </div>
  );
};

export default SearchFilters;
