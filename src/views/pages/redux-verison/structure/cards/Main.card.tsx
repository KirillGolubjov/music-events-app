import { useState, Fragment } from "react";

import { Event } from "@/types/event.model";

import { useAppSelector } from "@/redux/app";
import { selectEventsState } from "@/redux/features/event/event.selectors";

import { DetailsCard } from "./Details.card";

import { getBestQualityImage } from "@/common/utils/event-utils";

interface MainCardProps {
  searchedEvents: Event[];
  selectedGenre: string | null;
}

export const MainCard = ({ searchedEvents, selectedGenre }: MainCardProps): JSX.Element => {
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const { loading } = useAppSelector(selectEventsState);

  const onToggleEventDetails = (id: string) => {
    if (selectedEventId === id) {
      setSelectedEventId(null);
    } else {
      setSelectedEventId(id);
    }
  };

  const onCloseEventDetails = () => {
    setSelectedEventId(null);
  };

  const filteredEventsByGenre = selectedGenre
    ? searchedEvents.filter(
        event =>
          event.classifications?.some(
            classification => classification.genre?.id.toString() === selectedGenre
          )
      )
    : searchedEvents;

  const sortedEventsByDate = filteredEventsByGenre
    ? [...filteredEventsByGenre].sort(
        (a, b) =>
          new Date(a.dates.start.dateTime).getTime() - new Date(b.dates.start.dateTime).getTime()
      )
    : [];

  return (
    <>
      {sortedEventsByDate.length === 0 && (
        <h1 className="event__message">
          {loading ? <div className="loading-spinner" /> : "Events not found 🐒"}
        </h1>
      )}
      {sortedEventsByDate.map(event => (
        <Fragment key={event?.id}>
          <div className="event__div">
            <button
              onClick={() => onToggleEventDetails(event.id)}
              className="event__card"
              style={{
                backgroundImage: `url(${getBestQualityImage(event?.images)?.url})`,
              }}
            >
              {selectedEventId === event?.id && <div className="triangle" />}
            </button>
          </div>
          {selectedEventId === event?.id && (
            <DetailsCard event={event} onClose={onCloseEventDetails} />
          )}
        </Fragment>
      ))}
    </>
  );
};
