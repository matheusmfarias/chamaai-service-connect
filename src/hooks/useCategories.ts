
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase';
import { toast } from '@/hooks/use-toast';

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string | null;
  created_at: string;
}

export const useCategories = () => {
  const { data: categories = [], isLoading, error } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name', { ascending: true });
      
      if (error) {
        toast({
          title: 'Erro ao carregar categorias',
          description: error.message,
          variant: 'destructive',
        });
        throw error;
      }
      
      return data as Category[];
    },
  });

  return {
    categories,
    isLoading,
    error,
  };
};
