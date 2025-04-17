
import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const FAQQuestionForm = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "client",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await supabase.from("faq_questions").insert([formData]);
      
      setFormData({
        name: "",
        email: "",
        category: "client",
        message: "",
      });

      toast({
        title: "Recebemos sua pergunta!",
        description: "Em breve entraremos em contato por e-mail.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro ao enviar pergunta",
        description: "Por favor, tente novamente mais tarde.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12 border-t">
      <div className="flex items-center gap-2 mb-6">
        <MessageCircle className="w-6 h-6" />
        <h2 className="text-2xl font-semibold">Ainda tem dúvidas?</h2>
      </div>

      <form onSubmit={handleSubmit} className="max-w-xl space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">Nome</Label>
          <Input
            id="name"
            required
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">E-mail</Label>
          <Input
            id="email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Categoria</Label>
          <select
            id="category"
            className="flex w-full rounded-md border border-input bg-background px-3 py-2"
            value={formData.category}
            onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
          >
            <option value="client">Sou Cliente</option>
            <option value="provider">Sou Prestador de Serviço</option>
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">Mensagem</Label>
          <Textarea
            id="message"
            required
            value={formData.message}
            onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
          />
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? "Enviando..." : "Enviar minha dúvida"}
        </Button>
      </form>
    </div>
  );
};

export default FAQQuestionForm;
