import { Header } from "@/components/common/header/Header";
import { Search, SearchResultsSection } from "@/features/search";

export function SearchPage() {

  return (
    <div>
      <Header/>
      <Search/>
      <SearchResultsSection />
    </div>
  );
}
