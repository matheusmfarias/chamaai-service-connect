
import { ArrowDownAZ } from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { sortOptions } from "./constants";

interface SortFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export const SortFilter = ({ value, onChange }: SortFilterProps) => {
  return (
    <div>
      <label className="text-sm font-medium mb-1 block">
        <ArrowDownAZ className="w-4 h-4 inline-block mr-1" /> Ordenar por
      </label>
      <Select 
        value={value}
        onValueChange={onChange}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Ordenar por" />
        </SelectTrigger>
        <SelectContent>
          {sortOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
