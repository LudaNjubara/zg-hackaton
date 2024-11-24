import React, { useRef, useState, useEffect } from "react";
import { FaBookmark, FaShareAlt } from "react-icons/fa";
import { Header } from "@/components/common/header/Header.tsx";
import { API_ENDPOINTS } from "@/constants"; // Import the Header component
import { useBookmarks } from "@/providers/bookmarks-provider";
import event_image_1 from "@/assets/images/1.jpeg";
import event_image_2 from "@/assets/images/2.jpeg";

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

export const EventScrollFeed: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { bookmarks, addBookmark, removeBookmark } = useBookmarks();

  // Fetch events from the backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.EVENT.GET_EVENTS);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setEvents(data);
      } catch (err) {
        console.error("Error fetching events:", err);
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleBookmark = (event: Event) => {
    if (bookmarks.some((bookmarkedEvent) => bookmarkedEvent.id === event.id)) {
      removeBookmark(event.id);
    } else {
      addBookmark(event);
    }
  };

  const handleScroll = (direction: "next" | "previous") => {
    if (containerRef.current) {
      const container = containerRef.current;
      const currentScroll = container.scrollTop;
      const viewportHeight = window.innerHeight;

      container.scrollTo({
        top:
          direction === "next"
            ? currentScroll + viewportHeight
            : currentScroll - viewportHeight,
        behavior: "smooth",
      });
    }
  };

  const filteredEvents = events.filter((event) =>
    event.shortName.toLowerCase().includes(query.toLowerCase())
  );

  if (loading) {
    return <div>Loading events...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="relative">
      {/* Feed Container */}
      <div
        ref={containerRef}
        className="h-screen overflow-y-scroll snap-y snap-mandatory pb-16" // Added padding for the navbar
      >
        {/* Event Feed */}
        <div>
          {filteredEvents.map((event, idx) => (
            <div
              key={event.id}
              className="h-screen flex flex-col justify-end snap-start relative bg-black"
              style={{
                backgroundImage: `url(${
                  idx % 2 === 0
                    ? "https://v5.airtableusercontent.com/v3/u/35/35/1732449600000/22P6I1wcpuzqtCgx2nno3g/3Wjb14Oyn0GHIR7e3S7De4y7eEq4iW8GlkCiStBiicjUWji3ppPMk8ubSAURjPdWXfVDSg1N0NlRyWEFYXVZX5YQiLqLCT7-5ciPCIcdD6Ve56YK1j_eK_4oX4paCHYSOta2_PmbP9MCNhmbH6yXkg/g7cmaEuE5C_2vj_UBEIvyT0NqCet1FGvpCXWWF5g8Kw"
                    : "https://v5.airtableusercontent.com/v3/u/35/35/1732449600000/tFA-Md7bTewWN6bp55EQYQ/LndRQcLnM_Vo8PyCpmc105VSJiLm1iy8nGBs3DzEJOAoLmgGQl6eQiKFub6POuiG-f7lv2OYtivwN5D9qG5dLtF1mM_kU3WuY5q6qtMGl9f0q3Zim6XGvy1PhBMipCf_chEfLomE-Mu4RPDCuWKSfg/K0VNywUek1WWEUwi9hfgcA1cg4EiJ8mxCWZfy8NKUcA"
                })`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-30"></div>

              {/* Action Buttons and Event Details */}
              <div className="relative z-10 p-6 pb-20 text-white flex flex-col gap-8">
                {/* Action Buttons (Moved Higher Above Details) */}
                <div className="flex flex-col items-end gap-3 mb-6">
                  {/* Save Button */}
                  <button
                    className="hover:opacity-80 transition"
                    onClick={() => handleBookmark(event)}
                    aria-label="Save Event"
                  >
                    <FaBookmark
                      size={24}
                      color={
                        bookmarks.some(
                          (bookmarkedEvent) => bookmarkedEvent.id === event.id
                        )
                          ? "yellow"
                          : "white"
                      }
                    />
                  </button>

                  {/* Share Button */}
                  <button
                    className="hover:opacity-80 transition"
                    onClick={() => console.log(`Shared event ${event.id}`)}
                    aria-label="Share Event"
                  >
                    <FaShareAlt size={24} />
                  </button>
                </div>

                {/* Event Details */}
                <div>
                  <h2 className="text-2xl font-bold">{event.shortName}</h2>
                  <p className="text-sm">
                    {event.startDate
                      ? new Date(event.startDate).toLocaleString()
                      : "TBA"}
                  </p>
                  <p className="text-sm">{event.location || "Location TBA"}</p>

                  {/* Event Types Tags */}
                  <div className="mt-2 flex flex-wrap gap-2">
                    {event.eventTypes.map((type, index) => (
                      <span
                        key={index}
                        className="bg-blue-600 text-white text-xs px-2 py-1 rounded"
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fixed Navbar */}
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <Header />
      </div>
    </div>
  );
};

export default EventScrollFeed;
