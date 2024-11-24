import React from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const handleSave = () => {
    console.log(`Event ${event.id} saved.`);
  };

  const { bookmarks, addBookmark, removeBookmark } = useBookmarks();

  const handleBookmark = (event: Event) => {
    if (bookmarks.some((bookmarkedEvent) => bookmarkedEvent.id === event.id)) {
      removeBookmark(event.id);
    } else {
      addBookmark(event);
    }
  };

  const handleGoToEventDetails = () => {
    console.log(event);
    navigate(`/event/${event.id}`, { state: event });
  };

  return (
    <div
      className="max-w-sm bg-white rounded-lg shadow-md overflow-hidden relative"
      onClick={() => handleGoToEventDetails()}
    >
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
        src={
          "https://v5.airtableusercontent.com/v3/u/35/35/1732449600000/tFA-Md7bTewWN6bp55EQYQ/LndRQcLnM_Vo8PyCpmc105VSJiLm1iy8nGBs3DzEJOAoLmgGQl6eQiKFub6POuiG-f7lv2OYtivwN5D9qG5dLtF1mM_kU3WuY5q6qtMGl9f0q3Zim6XGvy1PhBMipCf_chEfLomE-Mu4RPDCuWKSfg/K0VNywUek1WWEUwi9hfgcA1cg4EiJ8mxCWZfy8NKUcA"
        }
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
