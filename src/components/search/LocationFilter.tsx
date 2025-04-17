
import { MapPin } from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { locations } from "./constants";

interface LocationFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export const LocationFilter = ({ value, onChange }: LocationFilterProps) => {
  return (
    <div>
      <label className="text-sm font-medium mb-1 block">
        <MapPin className="w-4 h-4 inline-block mr-1" /> Localização
      </label>
      <Select 
        value={value}
        onValueChange={onChange}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Selecione a localização" />
        </SelectTrigger>
        <SelectContent>
          {locations.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
