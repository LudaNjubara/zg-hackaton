import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { SearchIcon } from "lucide-react";
import { forwardRef } from "react";

type TSearchInputProps = {
    className?: string;
    isFiltersOpen: boolean;
    onFocus: () => void;
    onChange: (query: string) => void;
    onSubmit: () => void;
};

export const SearchInput = forwardRef<HTMLInputElement, TSearchInputProps>(
    (props: TSearchInputProps, ref) => {
        const { className, isFiltersOpen, onFocus, onChange, onSubmit } = props;

        return (
            <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 w-[90%] max-w-md bg-white/60 backdrop-blur-md rounded-full shadow-lg p-2 flex items-center gap-2">
                {/* Search Input */}
                <Input
                    type="text"
                    ref={ref}
                    onChange={(e) => onChange(e.target.value)}
                    onFocus={onFocus} // Trigger filters open
                    className={cn(className, "grow bg-transparent text-black placeholder-black border-none")}
                    placeholder="Search..."
                />

                {/* Submit Button */}
                {isFiltersOpen && (
                    <Button
                        type="button"
                        onClick={onSubmit}
                        className="bg-white text-black hover:bg-gray-100 rounded-full w-9 h-9 flex items-center justify-center shadow-sm"
                    >
                        <SearchIcon size={20} />
                    </Button>
                )}
            </div>
        );
    }
);
