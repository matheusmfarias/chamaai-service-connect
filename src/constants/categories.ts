
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
