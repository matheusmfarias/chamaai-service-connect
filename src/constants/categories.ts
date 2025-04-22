
export const serviceCategories = [
  { id: "faxina", name: "Faxina" },
  { id: "eletrica", name: "Elétrica" },
  { id: "pintura", name: "Pintura" },
  { id: "hidraulica", name: "Hidráulica" },
  { id: "reforma", name: "Reforma" },
] as const;

export type ServiceCategory = typeof serviceCategories[number]["id"];
