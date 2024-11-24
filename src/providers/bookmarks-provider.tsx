import React, { createContext, useContext, useState, useEffect } from "react";

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

type BookmarksContextType = {
  bookmarks: Event[];
  addBookmark: (event: Event) => void;
  removeBookmark: (eventId: number) => void;
};

const BookmarksContext = createContext<BookmarksContextType | undefined>(
  undefined
);

export const BookmarksProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [bookmarks, setBookmarks] = useState<Event[]>(() => {
    const storedBookmarks = localStorage.getItem("bookmarks");
    return storedBookmarks ? JSON.parse(storedBookmarks) : [];
  });

  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  const addBookmark = (event: Event) => {
    setBookmarks((prevBookmarks) => [...prevBookmarks, event]);
  };

  const removeBookmark = (eventId: number) => {
    setBookmarks((prevBookmarks) =>
      prevBookmarks.filter((event) => event.id !== eventId)
    );
  };

  return (
    <BookmarksContext.Provider
      value={{ bookmarks, addBookmark, removeBookmark }}
    >
      {children}
    </BookmarksContext.Provider>
  );
};

export const useBookmarks = () => {
  const context = useContext(BookmarksContext);
  if (context === undefined) {
    throw new Error("useBookmarks must be used within a BookmarksProvider");
  }
  return context;
};
