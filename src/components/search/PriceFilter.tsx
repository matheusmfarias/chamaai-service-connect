
import { DollarSign } from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { priceRanges } from "./constants";

interface PriceFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export const PriceFilter = ({ value, onChange }: PriceFilterProps) => {
  return (
    <div>
      <label className="text-sm font-medium mb-1 block">
        <DollarSign className="w-4 h-4 inline-block mr-1" /> Faixa de preço
      </label>
      <Select 
        value={value}
        onValueChange={onChange}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Selecione o preço" />
        </SelectTrigger>
        <SelectContent>
          {priceRanges.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
