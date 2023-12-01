import { useState, Fragment } from "react";

import { useEventContext } from "../../Events.context";

import { EventDetailsCard } from "./EventDetails.card";

import { getBestQualityImage } from "@/common/utils/event-utils";

export const EventMainCard = (): JSX.Element => {
  const { searchedEvents, selectedGenre } = useEventContext();

  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

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

  const sortedEventsByDate = filteredEventsByGenre.sort(
    (a, b) =>
      new Date(a.dates.start.dateTime).getTime() - new Date(b.dates.start.dateTime).getTime()
  );

  return (
    <>
      {sortedEventsByDate.length === 0 && <h1 className="event__message">Events not found 🐒</h1>}
      {sortedEventsByDate.map(event => (
        <Fragment key={event.id}>
          <div className="event__div">
            <button
              onClick={() => onToggleEventDetails(event.id)}
              className="event__card"
              style={{
                backgroundImage: `url(${getBestQualityImage(event.images)?.url})`,
              }}
            >
              {selectedEventId === event.id && <div className="triangle" />}
            </button>
          </div>
          {selectedEventId === event.id && (
            <EventDetailsCard event={event} onClose={onCloseEventDetails} />
          )}
        </Fragment>
      ))}
    </>
  );
};
