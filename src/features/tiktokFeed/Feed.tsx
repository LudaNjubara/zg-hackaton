import React, { useRef, useState, useEffect } from "react";
import { FaBookmark, FaShareAlt } from "react-icons/fa";
import { Header } from "@/components/common/header/Header.tsx"; // Import the Header component

type Event = {
    id: number;
    eventImageUrl: string | null; // Image URL or placeholder
    shortName: string; // Event name
    startDate: string | null; // Start date
    location: string | null; // Event location
    eventTypes: string[]; // Event tags
};

export const EventScrollFeed: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Fetch events from the backend
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch("http://localhost:8080/events");
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
                    {filteredEvents.map((event) => (
                        <div
                            key={event.id}
                            className="h-screen flex flex-col justify-end snap-start relative bg-black"
                            style={{
                                backgroundImage: `url(${event.eventImageUrl || "https://via.placeholder.com/1080x1920"})`,
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
                                        onClick={() => console.log(`Saved event ${event.id}`)}
                                        aria-label="Save Event"
                                    >
                                        <FaBookmark size={24} />
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
