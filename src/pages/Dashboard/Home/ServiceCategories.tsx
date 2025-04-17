
import { useNavigate } from "react-router-dom";
import { Wrench, Paintbrush, Droplets, Home, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const categories = [
  { id: "faxina", label: "Faxina", icon: Sparkles },
  { id: "eletrica", label: "Elétrica", icon: Wrench },
  { id: "pintura", label: "Pintura", icon: Paintbrush },
  { id: "hidraulica", label: "Hidráulica", icon: Droplets },
  { id: "reforma", label: "Reforma", icon: Home },
];

const ServiceCategories = () => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
      {categories.map((category) => (
        <Button
          key={category.id}
          variant="outline"
          className="flex flex-col items-center justify-center h-24 hover:bg-blue-50 hover:border-blue-200 transition-colors"
          onClick={() => navigate(`/prestadores/${category.id}`)}
        >
          <category.icon className="h-6 w-6 mb-2 text-chamaai-blue" />
          <span>{category.label}</span>
        </Button>
      ))}
    </div>
  );
};

export default ServiceCategories;
