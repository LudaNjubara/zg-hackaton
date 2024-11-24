import { cn } from "@/lib/utils";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TSearchState } from "../types";
import { Filters } from "./filters/Filters";
import { SearchInput } from "./search-input/SearchInput";

type TSearchProps = {
  className?: string;
};

export function Search({ className }: TSearchProps) {
  // hooks
  const navigate = useNavigate();

  // state
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [search, setSearch] = useState<TSearchState>({
    query: "",
    filters: {
      fromDate: "",
      toDate: "",
      price: "",
      category: [],
    },
  });

  // refs
  const searchFieldRef = useRef<HTMLInputElement>(null);

  // methods
  const handleCloseFilters = () => {
    setIsFiltersOpen(false);
  };

  const handleInputFocus = () => {
    setIsFiltersOpen(true); // Open full-screen filters
  };

  const handleSearchChange = (query: string) => {
    setSearch((prev) => ({ ...prev, query }));
  };

  const handleFiltersChange = (filterType: string, value: string | string[]) => {
    setSearch((prev) => ({
      ...prev,
      filters: {
        ...prev.filters,
        [filterType]: value,
      },
    }));
  };

  const handleSearchSubmit = () => {
    const urlSearchParams = new URLSearchParams();
    if (search.query) {
      urlSearchParams.set("q", search.query);
    }
    if (search.filters.fromDate) {
      urlSearchParams.set("fromDate", search.filters.fromDate);
    }
    if (search.filters.toDate) {
      urlSearchParams.set("toDate", search.filters.toDate);
    }
    if (search.filters.price) {
      urlSearchParams.set("price", search.filters.price);
    }
    if (search.filters.category.length > 0) {
      urlSearchParams.set("category", search.filters.category.join(","));
    }

    navigate(`/search?${urlSearchParams.toString()}`);
    setIsFiltersOpen(false); // Close filters after submission
  };

  return (
      <div className={cn(className, "relative")}>
        {/* Search Input */}
        <SearchInput
            ref={searchFieldRef}
            onFocus={handleInputFocus}
            onChange={handleSearchChange}
            onSubmit={handleSearchSubmit}
            isFiltersOpen={isFiltersOpen}
        />

        {/* Full-Screen Filters Overlay */}
        {isFiltersOpen && (
            <div className="fixed inset-0 bg-black/70 z-40 flex flex-col items-center justify-center">
              <Filters onClose={handleCloseFilters} onChange={handleFiltersChange} />
              <button
                  onClick={handleCloseFilters}
                  className="absolute top-4 right-4 bg-white text-black rounded-full p-2 shadow-md"
              >
                Close
              </button>
            </div>
        )}
      </div>
  );
}
