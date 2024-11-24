import { GridView } from "@/components/elements";
import { EventCard } from "@/features/events-grid/EventCard";
import { cn } from "@/lib/utils";

type Event = {
  id: number;
  eventImageUrl: string;
  shortName: string;
  longName: string;
  startDate: string | null;
  endDate: string | null;
  location: string | null; // Ensure location has lat and lng
  description: string;
  eventCategories: string[] | null;
  eventTypes: string[];
};

type TResultsGridProps = {
  className?: string;
  events: Event[];
};

export function ResultsGrid({ className, events }: TResultsGridProps) {
  return (
    <GridView className={cn(className, "list-none")}>
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </GridView>
  );
}
