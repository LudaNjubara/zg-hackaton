type TEvent = {
  id: number;
  eventImageUrl: string | null; // Image URL
  shortName: string; // Event title
  location: string | null; // Event location
  startDate: string | null; // Event start date
  endDate: string | null; // Event end date
  eventCategories: string[]; // Event tags
};

type TEventCardProps = {
  event: TEvent;
};

export function EventCard({ event }: TEventCardProps) {
  return (
    <div className="max-w-sm bg-white rounded-lg shadow-md overflow-hidden">
      {/* Event Image */}
      <img
        src={event.eventImageUrl || "https://via.placeholder.com/400x200"}
        alt={event.shortName}
        className="w-full h-48 object-cover"
      />

      {/* Event Details */}
      <div className="p-4">
        {/* Event Tags */}
        {event.eventCategories.length > 0 && (
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
        <p className="text-sm text-gray-600">{event.location || "Location not available"}</p>

        {/* Event Date and Time */}
        <p className="text-sm text-gray-500">
          {event.startDate ? `From ${new Date(event.startDate).toLocaleString()}` : "Start date TBA"}{" "}
          {event.endDate ? `to ${new Date(event.endDate).toLocaleString()}` : ""}
        </p>
      </div>
    </div>
  );
}
