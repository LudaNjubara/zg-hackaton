import { GridView } from "@/components/elements";
import { EventCard } from "@/features/events-grid/EventCard";
import { useBookmarks } from "@/providers/bookmarks-provider";

export function FavouritesPage() {
  const { bookmarks } = useBookmarks();

  return (
    <div className="p-10">
      <h1 className="font-semibold text-2xl">Your Favourites</h1>

      <GridView>
        {bookmarks.length === 0 ? (
          <p className="mt-10 text-base">No favourites yet.</p>
        ) : (
          bookmarks.map((bookmark) => (
            <EventCard key={bookmark.id} event={bookmark} />
          ))
        )}
      </GridView>
    </div>
  );
}
