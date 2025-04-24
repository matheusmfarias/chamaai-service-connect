
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase';
import { useToast } from '@/hooks/use-toast';

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string | null;
  created_at: string;
}

export const useCategories = () => {
  const { toast } = useToast();
  
  const { data: categories = [], isLoading, error } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      console.log('Fetching categories from Supabase');
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name', { ascending: true });
      
      if (error) {
        console.error('Error fetching categories:', error);
        toast({
          title: 'Erro ao carregar categorias',
          description: error.message,
          variant: 'destructive',
        });
        throw error;
      }
      
      console.log('Categories fetched:', data);
      return data as Category[];
    },
  });

  return {
    categories,
    isLoading,
    error,
  };
};
