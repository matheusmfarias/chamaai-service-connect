
import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FilterContent } from "./FilterContent";
import type { FilterValues } from "./types";

interface MobileFilterSheetProps {
  filters: FilterValues;
  onFilterChange: (key: keyof FilterValues, value: string) => void;
}

export const MobileFilterSheet = ({ filters, onFilterChange }: MobileFilterSheetProps) => {
  return (
    <div className="mb-5">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="w-full">
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            Filtrar e ordenar resultados
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="h-[80vh]">
          <SheetHeader>
            <SheetTitle>Filtros de Busca</SheetTitle>
          </SheetHeader>
          <div className="py-4">
            <FilterContent filters={filters} onFilterChange={onFilterChange} />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
