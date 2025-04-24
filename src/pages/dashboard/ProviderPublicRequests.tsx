
import { useState } from 'react';
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCategories } from '@/hooks/useCategories';
import PublicRequestsList from '@/components/dashboard/PublicRequestsList';

export default function ProviderPublicRequests() {
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const { categories, isLoading } = useCategories();
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Solicitações Públicas</h2>
        
        <div className="w-64">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger disabled={isLoading}>
              <SelectValue placeholder="Todas as categorias" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Categorias</SelectLabel>
                <SelectItem value="">Todas as categorias</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <PublicRequestsList categoryFilter={categoryFilter} />
    </div>
  );
}
