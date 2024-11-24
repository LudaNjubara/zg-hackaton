import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { TFilterType, TPriceFilterItem } from "../../types";
import { CategoryFilter } from "./CategoryFilter";
/*import { DateFilter } from "./DateFilter";*/
import { PriceFilter } from "./PriceFilter";

type FiltersProps = {
  className?: string;
  onClose: () => void;
  onChange: (filterType: TFilterType, value: string | string[]) => void;
};

export function Filters({ className, onClose, onChange }: FiltersProps) {
  // handlers
  /*const handleDateFilterClick = (dateItem: DateRange | undefined) => {
    const fromDateMillis = dateItem?.from ? dateToMillis(dateItem.from) : "";
    const toDateMillis = dateItem?.to ? dateToMillis(dateItem.to) : "";

    onChange("fromDate", `${fromDateMillis}`);
    onChange("toDate", `${toDateMillis}`);
  };*/

  const handlePriceFilterClick = (priceItem: TPriceFilterItem) => {
    onChange("price", priceItem.value);
  };

  const handleCategoryFilterClick = (categoryIds: number[]) => {
    onChange(
        "category",
        categoryIds.map((id) => `${id}`)
    );
  };

  return (
      <div
          className={cn(
              className,
              "fixed inset-0 z-50 bg-white flex flex-col items-center justify-center"
          )}
      >
        {/* Filters Content */}
        <div className="w-full max-w-lg p-6 rounded-lg bg-white">
          <ul className="space-y-6">
            {/* <DateFilter onChange={handleDateFilterClick} /> */}
            <PriceFilter onClick={handlePriceFilterClick} />
            <CategoryFilter onClick={handleCategoryFilterClick} />
          </ul>
        </div>

        {/* Close Button */}
        <div className="mt-8">
          <button
              onClick={onClose}
              className="bg-gray-200 text-black rounded-full p-3 hover:bg-gray-300"
              aria-label="Close Filters"
          >
            ✖
          </button>
        </div>
      </div>
  );
}
