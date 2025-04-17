
import { Star } from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { ratings } from "./constants";

interface RatingFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export const RatingFilter = ({ value, onChange }: RatingFilterProps) => {
  return (
    <div>
      <label className="text-sm font-medium mb-1 block">
        <Star className="w-4 h-4 inline-block mr-1" /> Avaliação mínima
      </label>
      <Select 
        value={value}
        onValueChange={onChange}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Selecione a avaliação" />
        </SelectTrigger>
        <SelectContent>
          {ratings.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
