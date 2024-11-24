import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { TFilterType, TPriceFilterItem } from "../../types";
import { CategoryFilter } from "./CategoryFilter";
import { PriceFilter } from "./PriceFilter";

type FiltersProps = {
  className?: string;
  onClose: () => void;
  onChange: (filterType: TFilterType, value: string | string[]) => void;
};

export function Filters({ className, onClose, onChange }: FiltersProps) {
  // handlers
  /*  const handleDateFilterClick = (dateItem: DateRange | undefined) => {
    const fromDateMillis = dateItem?.from ? dateToMillis(dateItem.from) : "";
    const toDateMillis = dateItem?.to ? dateToMillis(dateItem.to) : "";

    onChange("fromDate", `${fromDateMillis}`);
    onChange("toDate", `${toDateMillis}`);
  }; */

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
        "fixed inset-0 z-3 bg-background pt-48 px-8 pb-8 overflow-y-auto backdrop-blur-lg"
      )}
    >
      <div className="flex justify-end">
        <Button onClick={onClose} className="ml-auto" variant={"ghost"}>
          Close filters
        </Button>
      </div>

      <ul className="space-y-4">
        {/* <DateFilter onChange={handleDateFilterClick} /> */}
        <PriceFilter onClick={handlePriceFilterClick} />
        <CategoryFilter onClick={handleCategoryFilterClick} />
      </ul>
    </div>
  );
}
