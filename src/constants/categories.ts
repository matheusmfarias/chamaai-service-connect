
import { Category } from '@/hooks/useCategories';

// These are just fallback categories in case the API call fails
export const serviceCategories = [
  { id: "limpeza", name: "Limpeza", icon: "clean" },
  { id: "eletrica", name: "Elétrica", icon: "zap" },
  { id: "pintura", name: "Pintura", icon: "paintbrush" },
  { id: "hidraulica", name: "Hidráulica", icon: "droplets" },
  { id: "montagem-moveis", name: "Montagem de Móveis", icon: "sofa" },
  { id: "jardinagem", name: "Jardinagem", icon: "flower" },
  { id: "reforma", name: "Reforma", icon: "hammer" },
] as const;

export type ServiceCategory = typeof serviceCategories[number]["id"];

export const serviceTypes = [
  { id: "cliente", name: "Cliente" },
  { id: "prestador", name: "Prestador de Serviços" }
] as const;

export type UserType = typeof serviceTypes[number]["id"];

// Helper function to convert a Category[] from the database to the format expected by components
export const formatCategories = (categories: Category[]) => {
  return categories.map(cat => ({
    id: cat.slug,
    name: cat.name,
    icon: cat.icon || cat.slug
  }));
};
