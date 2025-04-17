
import { LocationFilter } from "./LocationFilter";
import { RatingFilter } from "./RatingFilter";
import { PriceFilter } from "./PriceFilter";
import { SortFilter } from "./SortFilter";
import type { FilterValues } from "./types";

interface FilterContentProps {
  filters: FilterValues;
  onFilterChange: (key: keyof FilterValues, value: string) => void;
}

export const FilterContent = ({ filters, onFilterChange }: FilterContentProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
      <LocationFilter
        value={filters.location}
        onChange={(value) => onFilterChange("location", value)}
      />
      <RatingFilter
        value={filters.rating}
        onChange={(value) => onFilterChange("rating", value)}
      />
      <PriceFilter
        value={filters.priceRange}
        onChange={(value) => onFilterChange("priceRange", value)}
      />
      <SortFilter
        value={filters.sortBy}
        onChange={(value) => onFilterChange("sortBy", value)}
      />
    </div>
  );
};
