
import { ServiceProvider } from "@/hooks/useServiceProviders";
import { FilterValues } from "@/components/SearchFilters";

export const filterProviders = (
  providers: ServiceProvider[],
  filters: FilterValues
): ServiceProvider[] => {
  let results = [...providers];
  
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
  
  return results;
};
