import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "@/redux/app";
import { selectEventsState } from "@/redux/features/event/event.selectors";
import { findAllEvents } from "@/redux/features/event/event.slice";

import { Body, Footer, Header } from "./structure";

export const EventMain = (): JSX.Element => {
  const {
    entities: events,
    loading,
    allLoaded,
    page,
    pageSize,
  } = useAppSelector(selectEventsState);
  const dispatch = useAppDispatch();

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  useEffect(() => {
    dispatch(findAllEvents({ page, pageSize }));
  }, [dispatch]);

  const handleScroll = () => {
    if (!loading && !allLoaded) {
      const scrollThreshold =
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight;

      if (scrollThreshold) {
        dispatch(findAllEvents({ page: page + 1, pageSize }));
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const searchedEvents =
    searchQuery.length > 0
      ? events.filter(event =>
          `${event.name} ${event.promoter.name} ${event.classifications[0].genre.name}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      : events;

  return (
    <>
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
      />
      <Body searchedEvents={searchedEvents} selectedGenre={selectedGenre} />
      <Footer />
    </>
  );
};
