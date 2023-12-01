import { createContext, useContext, useEffect, useState, Dispatch, SetStateAction } from "react";

import { Event } from "@/types/event.model";

import { EventApiHookType, useEventApi } from "@/hooks/useEventApi";
import { GenreApiHookType, useGenreApi } from "@/hooks/useGenreApi";

export interface EventContext {
  genresApiHook: GenreApiHookType;
  eventApiHook: EventApiHookType;
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  selectedGenre: string | null;
  setSelectedGenre: Dispatch<SetStateAction<string | null>>;
  searchedEvents: Event[];
}

export const EventContext = createContext<EventContext | null>(null);

export const useEventContext = (): EventContext => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error("useEventContext must be used within an EventProvider");
  }
  return context;
};

type EventProviderProps = {
  children: React.ReactNode;
};

export const EventProvider = ({ children }: EventProviderProps): JSX.Element => {
  const genresApiHook = useGenreApi();
  const eventApiHook = useEventApi();
  const { events, findAllEvents } = useEventApi();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    findAllEvents(currentPage, 20);
  }, []);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight
    ) {
      setCurrentPage(prevPage => {
        findAllEvents(prevPage + 1, 20);
        return prevPage + 1;
      });
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [currentPage]);

  const searchedEvents =
    searchQuery.length > 0
      ? events.filter(event =>
          `${event.name} ${event.promoter.name} ${event.classifications[0].genre.name}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      : events;

  const eventContextValues: EventContext = {
    searchQuery,
    setSearchQuery,
    selectedGenre,
    setSelectedGenre,
    searchedEvents,
    genresApiHook,
    eventApiHook,
  };

  return <EventContext.Provider value={eventContextValues}>{children}</EventContext.Provider>;
};
