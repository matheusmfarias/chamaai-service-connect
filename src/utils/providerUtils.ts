
import { ServiceProvider } from "@/types/serviceProvider";

export const filterProvidersBySearch = (providers: ServiceProvider[], query: string): ServiceProvider[] => {
  if (!query) return providers;
  
  const searchQuery = query.toLowerCase();
  return providers.filter(provider => {
    const categoryMatch = provider.category.toLowerCase().includes(searchQuery);
    const descriptionMatch = provider.description?.toLowerCase().includes(searchQuery) || false;
    const nameMatch = provider.profiles.full_name.toLowerCase().includes(searchQuery);
    
    const relatedTerms: Record<string, string[]> = {
      "faxina": ["faxineira", "limpeza", "limpador", "diarista"],
      "eletrica": ["eletricista", "eletrico", "instalação"],
      "pintura": ["pintor", "pintora"]
    };
    
    let relatedMatch = false;
    for (const [category, terms] of Object.entries(relatedTerms)) {
      if (provider.category.toLowerCase() === category && terms.some(term => searchQuery.includes(term))) {
        relatedMatch = true;
        break;
      }
      if (terms.includes(searchQuery) && provider.category.toLowerCase() === category) {
        relatedMatch = true;
        break;
      }
    }
    
    return categoryMatch || descriptionMatch || nameMatch || relatedMatch;
  });
};

export const filterProvidersByLocation = (providers: ServiceProvider[], location: string): ServiceProvider[] => {
  if (location === 'all') return providers;
  
  const locationKey = 
    location === "sao_paulo" ? "São Paulo" :
    location === "guarulhos" ? "Guarulhos" :
    location === "osasco" ? "Osasco" : "";
  
  return providers.filter(provider => provider.profiles.city?.includes(locationKey));
};

export const filterProvidersByRating = (providers: ServiceProvider[], rating: string): ServiceProvider[] => {
  if (rating === 'all') return providers;
  
  const minRating = parseInt(rating.replace("+", ""));
  return providers.filter(provider => provider.rating >= minRating);
};

export const filterProvidersByPrice = (providers: ServiceProvider[], priceRange: string): ServiceProvider[] => {
  if (priceRange === 'all') return providers;
  
  return providers.filter(provider => {
    if (priceRange === "low" && provider.rate_per_hour < 40) return true;
    if (priceRange === "medium" && provider.rate_per_hour >= 40 && provider.rate_per_hour <= 80) return true;
    if (priceRange === "high" && provider.rate_per_hour > 80) return true;
    return false;
  });
};

export const sortProviders = (providers: ServiceProvider[], sortBy: string): ServiceProvider[] => {
  if (sortBy === "rating") {
    return [...providers].sort((a, b) => b.rating - a.rating);
  } else if (sortBy === "recent") {
    return [...providers].sort((a, b) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  }
  return providers;
};
