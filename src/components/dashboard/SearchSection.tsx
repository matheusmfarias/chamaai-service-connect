
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

const categories = [
  { name: "Faxina", icon: "🧹" },
  { name: "Elétrica", icon: "⚡" },
  { name: "Pintura", icon: "🎨" },
  { name: "Hidráulica", icon: "🚰" },
  { name: "Reforma", icon: "🏠" },
];

const SearchSection = () => {
  const navigate = useNavigate();

  const handleSearch = (searchTerm: string) => {
    navigate(`/busca?q=${encodeURIComponent(searchTerm)}`);
  };

  const handleCategoryClick = (category: string) => {
    navigate(`/busca?categoria=${encodeURIComponent(category)}`);
  };

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6">Precisa de ajuda com o quê?</h2>
      
      <div className="relative mb-6">
        <Input
          type="text"
          placeholder="Ex: preciso trocar a tomada da cozinha"
          className="pl-10"
          onChange={(e) => handleSearch(e.target.value)}
        />
        <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
      </div>
      
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <Button
            key={category.name}
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => handleCategoryClick(category.name)}
          >
            <span>{category.icon}</span>
            {category.name}
          </Button>
        ))}
      </div>
    </section>
  );
};

export default SearchSection;
