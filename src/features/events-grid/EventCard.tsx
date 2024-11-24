import { useBookmarks } from "@/providers/bookmarks-provider";
import { FaBookmark } from "react-icons/fa";

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
type TEventCardProps = {
  event: Event;
};

export function EventCard({ event }: TEventCardProps) {
  const { bookmarks, addBookmark, removeBookmark } = useBookmarks();

  const handleBookmark = (event: Event) => {
    if (bookmarks.some((bookmarkedEvent) => bookmarkedEvent.id === event.id)) {
      removeBookmark(event.id);
    } else {
      addBookmark(event);
    }
  };

  return (
    <div className="max-w-sm bg-white rounded-lg shadow-md overflow-hidden relative">
      {/* Save Button */}
      <button
        onClick={() => handleBookmark(event)}
        className="absolute top-2 right-2 bg-background p-2 rounded-full shadow hover:bg-gray-100"
        aria-label="Save Event"
      >
        <FaBookmark
          size={24}
          color={
            bookmarks.some((bookmarkedEvent) => bookmarkedEvent.id === event.id)
              ? "yellow"
              : "black"
          }
        />
      </button>

      {/* Event Image */}
      <img
        src={event.eventImageUrl || "https://via.placeholder.com/400x200"}
        alt={event.shortName}
        className="w-full h-48 object-cover"
      />

      {/* Event Details */}
      <div className="p-4">
        {/* Event Tags */}
        {event.eventCategories && event.eventCategories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2">
            {event.eventCategories.map((category, index) => (
              <span
                key={index}
                className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded"
              >
                {category}
              </span>
            ))}
          </div>
        )}

        {/* Event Title */}
        <h3 className="text-lg font-bold mt-2">{event.shortName}</h3>

        {/* Event Location */}
        <p className="text-sm text-gray-600">
          {event.location || "Location not available"}
        </p>

        {/* Event Date and Time */}
        <p className="text-sm text-gray-500">
          {event.startDate
            ? `From ${new Date(event.startDate).toLocaleString()}`
            : "Start date TBA"}{" "}
          {event.endDate
            ? `to ${new Date(event.endDate).toLocaleString()}`
            : ""}
        </p>
      </div>
    </div>
  );
}
