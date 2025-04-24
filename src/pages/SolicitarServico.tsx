import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Calendar as CalendarIcon,
  Clock,
  PenSquare,
  Sparkles
} from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Layout from "@/components/Layout";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useServiceRequests } from "@/hooks/useServiceRequests";

const categories = [
  { id: "faxina", name: "Faxina" },
  { id: "pintura", name: "Pintura" },
  { id: "eletrica", name: "Elétrica" },
  { id: "hidraulica", name: "Hidráulica" },
  { id: "reforma", name: "Reforma" },
  { id: "jardinagem", name: "Jardinagem" },
];

const timeSlots = [
  "08:00", "09:00", "10:00", "11:00", "12:00", 
  "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"
];

const SolicitarServico = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [isImproving, setIsImproving] = useState(false);
  const navigate = useNavigate();
  const { createRequest, isLoading } = useServiceRequests();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description || !category || !date || !time) {
      return;
    }
    
    // Combina a data e hora em um objeto Date
    const scheduledDate = new Date(date);
    const [hours, minutes] = time.split(':').map(Number);
    scheduledDate.setHours(hours, minutes, 0, 0);
    
    const requestId = await createRequest({
      title,
      description,
      category,
      status: "pending",
      estimated_price: null,
      scheduled_date: scheduledDate.toISOString(),
      is_public: isPublic
    });
    
    if (requestId) {
      navigate("/dashboard");
    }
  };

  const improveWithAI = () => {
    setIsImproving(true);
    
    // Simulate AI processing
    setTimeout(() => {
      // Example of AI improving the description
      const originalDesc = description;
      let improvedDesc = originalDesc;
      
      if (originalDesc.toLowerCase().includes("pintura")) {
        improvedDesc = `Serviço de pintura em ${originalDesc.includes("m²") ? originalDesc : "parede de aproximadamente 15m²"}. Necessário aplicação de massa corrida e duas demãos de tinta ${originalDesc.toLowerCase().includes("cor") ? originalDesc.split("cor")[1].trim() : "em cor a definir"}. ${originalDesc.toLowerCase().includes("material") ? "" : "Os materiais devem ser fornecidos pelo prestador."}`;
      } else if (originalDesc.toLowerCase().includes("faxina") || originalDesc.toLowerCase().includes("limpeza")) {
        improvedDesc = `Serviço de limpeza completa em ${originalDesc.toLowerCase().includes("apartamento") || originalDesc.toLowerCase().includes("casa") ? originalDesc : "residência"}. Incluindo limpeza de pisos, janelas, banheiros e cozinha. ${originalDesc.toLowerCase().includes("material") ? originalDesc : "Materiais de limpeza devem ser fornecidos pelo prestador."}`;
      } else if (originalDesc.toLowerCase().includes("elétrica") || originalDesc.toLowerCase().includes("tomada")) {
        improvedDesc = `Serviço de instalação/manutenção elétrica. ${originalDesc.includes("tomada") ? originalDesc : "Verificação do sistema elétrico e possíveis reparos necessários."}`;
      }
      
      setDescription(improvedDesc);
      setIsImproving(false);
    }, 2000);
  };

  return (
    <Layout>
      <div className="container-custom py-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">Solicitar Serviço</h1>
          
          <Card>
            <CardHeader>
              <CardTitle>Detalhes do Serviço</CardTitle>
              <CardDescription>
                Descreva o serviço que você precisa e escolha quando deseja que ele seja realizado.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="title" className="text-sm font-medium">
                    Título do Serviço*
                  </label>
                  <Input
                    id="title"
                    placeholder="Ex: Pintura de sala, Instalação de tomadas..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Categoria*
                  </label>
                  <Select value={category} onValueChange={setCategory} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Categorias</SelectLabel>
                        {categories.map((cat) => (
                          <SelectItem key={cat.id} value={cat.id}>
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label htmlFor="description" className="text-sm font-medium">
                      Descrição do Serviço*
                    </label>
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
                  </div>
                  <Textarea
                    id="description"
                    placeholder="Descreva detalhadamente o serviço que você precisa..."
                    className="min-h-[120px]"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Data*
                    </label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? (
                            format(date, "PPP", { locale: ptBR })
                          ) : (
                            <span>Selecione uma data</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                          disabled={(date) => date < new Date()}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Horário*
                    </label>
                    <Select value={time} onValueChange={setTime}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um horário" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Horários Disponíveis</SelectLabel>
                          {timeSlots.map((slot) => (
                            <SelectItem key={slot} value={slot}>
                              {slot}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isPublic"
                    checked={isPublic}
                    onChange={(e) => setIsPublic(e.target.checked)}
                    className="rounded-md"
                  />
                  <label htmlFor="isPublic" className="text-sm font-medium">
                    Solicitação pública (qualquer prestador pode enviar orçamento)
                  </label>
                </div>
              </CardContent>
              
              <CardFooter className="flex justify-end space-x-2 border-t pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate(-1)}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="bg-chamaai-blue hover:bg-chamaai-lightblue"
                  disabled={isLoading}
                >
                  {isLoading ? "Enviando..." : "Solicitar Serviço"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default SolicitarServico;
