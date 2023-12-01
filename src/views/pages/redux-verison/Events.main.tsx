import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "@/redux/app";
import { selectEventsState } from "@/redux/features/event/event.selectors";
import { findAllEvents } from "@/redux/features/event/event.slice";

import { Body, Footer, Header } from "./structure";

export const EventMain = (): JSX.Element => {
  const { entities: events } = useAppSelector(selectEventsState);
  const dispatch = useAppDispatch();

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    dispatch(findAllEvents({ page: 1, pageSize: 20 }));
  }, [dispatch]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight
    ) {
      setCurrentPage(prevPage => {
        dispatch(findAllEvents({ page: prevPage + 1, pageSize: 20 }));
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