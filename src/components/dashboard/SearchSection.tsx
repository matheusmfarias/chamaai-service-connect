
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const categories = [
  { name: "Faxina", icon: "🧹" },
  { name: "Elétrica", icon: "⚡" },
  { name: "Pintura", icon: "🎨" },
  { name: "Hidráulica", icon: "🚰" },
  { name: "Reforma", icon: "🏠" },
  { name: "Jardinagem", icon: "🌱" },
  { name: "Montagem", icon: "🔧" },
  { name: "Instalação", icon: "📺" },
];

const SearchSection = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/busca?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && searchTerm.trim()) {
      handleSearch();
    }
  };

  const handleCategoryClick = (category: string) => {
    navigate(`/busca?categoria=${encodeURIComponent(category)}`);
  };

  return (
    <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <h2 className="text-xl font-medium mb-4">Buscar serviço</h2>
      
      <div className="relative mb-5">
        <Input
          type="text"
          placeholder="Ex: preciso trocar a tomada da cozinha"
          className="pl-10 pr-24"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <Search 
          className="absolute left-3 top-3 h-5 w-5 text-gray-400" 
        />
        <Button 
          className="absolute right-0 top-0 bottom-0 rounded-l-none bg-chamaai-blue hover:bg-chamaai-lightblue"
          onClick={handleSearch}
        >
          Buscar
        </Button>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-gray-600 mb-3">Categorias populares</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category.name}
              variant="outline"
              className="flex items-center gap-2 bg-white hover:bg-gray-50 border border-gray-200"
              onClick={() => handleCategoryClick(category.name)}
            >
              <span className="text-lg">{category.icon}</span>
              <span>{category.name}</span>
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SearchSection;
