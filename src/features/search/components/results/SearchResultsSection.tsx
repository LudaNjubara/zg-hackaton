import { GridView } from "@/components/elements";
import { RecentlyViewedSkeleton } from "@/components/loaders";
import { useSearchEvents } from "../../hooks/useSearchEvents";
import { ResultsGrid } from "./ResultsGrid";

export function SearchResultsSection() {
  const { data: events, isLoading, refetch: refetchEvents } = useSearchEvents();

  return (
    <section className="px-10 py-24">
      <h1 className="font-semibold text-2xl pb-2">Search Results</h1>
      {isLoading && (
        <GridView>
          {Array.from({ length: 4 }).map((_, index) => (
            <RecentlyViewedSkeleton key={index} />
          ))}
        </GridView>
      )}

      {!isLoading && !events.length && <p>No data found</p>}

      {!isLoading && !!events.length && <ResultsGrid events={events} />}
    </section>
  );
}
