
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchHeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const SearchHeader = ({ searchQuery, onSearchChange, onSubmit }: SearchHeaderProps) => {
  return (
    <motion.section 
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      }}
      className="bg-gradient-to-r from-chamaai-blue to-chamaai-lightblue text-white py-8"
    >
      <div className="container-custom">
        <h1 className="text-3xl font-bold mb-4">Resultados da Busca</h1>
        <form onSubmit={onSubmit} className="relative">
          <Input
            type="text"
            placeholder="Busque por serviços ou profissionais..."
            className="bg-white text-gray-800 pl-10 pr-4 py-6 rounded-lg w-full focus:ring-2 focus:ring-white"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Button 
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-chamaai-blue hover:bg-chamaai-lightblue"
          >
            Buscar
          </Button>
        </form>
      </div>
    </motion.section>
  );
};

export default SearchHeader;
