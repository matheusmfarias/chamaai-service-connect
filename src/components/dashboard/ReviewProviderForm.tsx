
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
import { Textarea } from '@/components/ui/textarea';
import { Star, Loader2 } from 'lucide-react';
import { useReviews } from '@/hooks/useReviews';

interface ReviewProviderFormProps {
  providerId: string;
  providerName: string;
  requestId: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function ReviewProviderForm({
  providerId,
  providerName,
  requestId,
  isOpen,
  onClose
}: ReviewProviderFormProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);
  
  const { createReview } = useReviews(providerId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating < 1) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await createReview({
        service_provider_id: providerId,
        rating,
        comment,
        request_id: requestId
      });
      
      setRating(0);
      setComment('');
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
            <DialogTitle>Avaliar {providerName}</DialogTitle>
            <DialogDescription>
              Compartilhe sua experiência com este prestador de serviços.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Sua avaliação*
                </label>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-8 h-8 cursor-pointer ${
                        (hoverRating || rating) >= star
                          ? "fill-amber-500 text-amber-500"
                          : "text-gray-300"
                      }`}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                    />
                  ))}
                </div>
                {rating === 0 && (
                  <p className="text-xs text-red-500 mt-1">
                    Selecione uma classificação
                  </p>
                )}
              </div>
              
              <div>
                <label htmlFor="comment" className="block text-sm font-medium mb-2">
                  Comentário (opcional)
                </label>
                <Textarea
                  id="comment"
                  placeholder="Compartilhe detalhes sobre sua experiência..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={4}
                  className="w-full"
                />
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting || rating === 0}
              className="bg-chamaai-blue hover:bg-chamaai-lightblue"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Enviando...
                </>
              ) : "Enviar Avaliação"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
