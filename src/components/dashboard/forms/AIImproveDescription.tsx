
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { useState } from "react";

interface AIImproveDescriptionProps {
  description: string;
  onImproved: (improvedText: string) => void;
}

export function AIImproveDescription({ description, onImproved }: AIImproveDescriptionProps) {
  const [isImproving, setIsImproving] = useState(false);

  const improveWithAI = () => {
    setIsImproving(true);
    
    // Simulate AI processing
    setTimeout(() => {
      let improvedDesc = description;
      
      if (description.toLowerCase().includes("pintura")) {
        improvedDesc = `Serviço de pintura em ${description.includes("m²") ? description : "parede de aproximadamente 15m²"}. Necessário aplicação de massa corrida e duas demãos de tinta ${description.toLowerCase().includes("cor") ? description.split("cor")[1].trim() : "em cor a definir"}. ${description.toLowerCase().includes("material") ? "" : "Os materiais devem ser fornecidos pelo prestador."}`;
      } else if (description.toLowerCase().includes("faxina") || description.toLowerCase().includes("limpeza")) {
        improvedDesc = `Serviço de limpeza completa em ${description.toLowerCase().includes("apartamento") || description.toLowerCase().includes("casa") ? description : "residência"}. Incluindo limpeza de pisos, janelas, banheiros e cozinha. ${description.toLowerCase().includes("material") ? description : "Materiais de limpeza devem ser fornecidos pelo prestador."}`;
      } else if (description.toLowerCase().includes("elétrica") || description.toLowerCase().includes("tomada")) {
        improvedDesc = `Serviço de instalação/manutenção elétrica. ${description.includes("tomada") ? description : "Verificação do sistema elétrico e possíveis reparos necessários."}`;
      }
      
      onImproved(improvedDesc);
      setIsImproving(false);
    }, 2000);
  };

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      className="text-chamaai-blue flex items-center gap-1"
      onClick={improveWithAI}
      disabled={!description || isImproving}
    >
      <Sparkles className="w-4 h-4" />
      {isImproving ? "Melhorando..." : "Melhorar com IA"}
    </Button>
  );
}
