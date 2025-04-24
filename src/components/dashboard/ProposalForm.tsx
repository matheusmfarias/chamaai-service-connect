
import { useState } from 'react';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useProposals } from '@/hooks/useProposals';
import { Loader2 } from 'lucide-react';

interface ProposalFormProps {
  requestId: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProposalForm({ requestId, isOpen, onClose }: ProposalFormProps) {
  const [price, setPrice] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const { createProposal } = useProposals(requestId);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!price || !message) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await createProposal.mutateAsync({
        request_id: requestId,
        price: parseFloat(price),
        message
      });
      
      setPrice('');
      setMessage('');
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Enviar Proposta</DialogTitle>
            <DialogDescription>
              Preencha os detalhes da sua proposta para este serviço.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <label htmlFor="price" className="text-sm font-medium">
                Valor Proposto (R$)*
              </label>
              <Input
                id="price"
                type="number"
                min="0"
                step="0.01"
                placeholder="Ex: 150,00"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">
                Mensagem*
              </label>
              <Textarea
                id="message"
                placeholder="Descreva sua proposta, incluindo prazos, materiais, etc."
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
              <p className="text-xs text-gray-500">
                Esta mensagem será visível para o cliente que solicitou o serviço.
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting || createProposal.isPending}
              className="bg-chamaai-blue hover:bg-chamaai-lightblue"
            >
              {isSubmitting || createProposal.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Enviando...
                </>
              ) : "Enviar Proposta"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
