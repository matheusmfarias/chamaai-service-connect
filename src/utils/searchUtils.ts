
import { ServiceProvider } from "@/hooks/useServiceProviders";
import type { FilterValues } from "@/components/search/types";

export const filterProviders = (
  providers: ServiceProvider[],
  filters: FilterValues
): ServiceProvider[] => {
  // Log para debug
  console.log("Filtrando prestadores:", providers.length);
  console.log("Filtros aplicados:", filters);
  
  let results = [...providers];
  
  if (filters.location !== "all") {
    console.log("Filtrando por localização:", filters.location);
    results = results.filter(provider => {
      const locationKey = filters.location === "sao_paulo" ? "São Paulo" :
                        filters.location === "guarulhos" ? "Guarulhos" :
                        filters.location === "osasco" ? "Osasco" : "";
      
      const providerCity = provider.profiles?.city || "";
      const matches = providerCity.includes(locationKey);
      
      console.log(`${provider.profiles?.full_name}: ${providerCity} inclui ${locationKey}? ${matches}`);
      return matches;
    });
  }
  
  if (filters.rating !== "all") {
    console.log("Filtrando por avaliação:", filters.rating);
    const minRating = parseInt(filters.rating.replace("+", ""));
    results = results.filter(provider => provider.rating >= minRating);
  }
  
  if (filters.priceRange !== "all") {
    console.log("Filtrando por faixa de preço:", filters.priceRange);
    results = results.filter(provider => {
      if (filters.priceRange === "low" && provider.rate_per_hour < 40) return true;
      if (filters.priceRange === "medium" && provider.rate_per_hour >= 40 && provider.rate_per_hour <= 80) return true;
      if (filters.priceRange === "high" && provider.rate_per_hour > 80) return true;
      return false;
    });
  }
  
  if (filters.sortBy === "rating") {
    console.log("Ordenando por avaliação");
    results = [...results].sort((a, b) => b.rating - a.rating);
  } else if (filters.sortBy === "recent") {
    console.log("Ordenando por recentes");
    results = [...results].sort((a, b) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  }
  
  console.log("Resultados filtrados:", results.length);
  return results;
};
