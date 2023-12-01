import { SerializedError } from "@reduxjs/toolkit";
import { useState } from "react";

import { Event, emptyEvent } from "@/types/event.model";

import { eventService } from "@/api/event.service";
import { alerts } from "@/feedback/alerts";
import { EX_SYSTEM } from "@/feedback/messages";

export interface EventApiHookType {
  event: Event;
  events: Event[];
  findAllEvents: (page: number, pageSize: number) => Promise<void>;
  onFindById: (id: string) => Promise<void>;
  allDataLoaded: boolean;
}

export const useEventApi = (): EventApiHookType => {
  const [event, setEvent] = useState<Event>(emptyEvent);
  const [events, setEvents] = useState<Event[]>([]);
  const [allDataLoaded, setAllDataLoaded] = useState(false);

  const findAllEvents = async (page: number, pageSize: number) => {
    try {
      const response = await eventService.findAllEvents(page, pageSize);
      const allEvents = response.data._embedded?.events;
      if (allEvents && allEvents.length) {
        setEvents(prevEvents => [...prevEvents, ...allEvents]);
      } else {
        setAllDataLoaded(true);
      }
    } catch (error) {
      console.error(error);
      alerts.errorAlert((error as SerializedError).message || EX_SYSTEM);
    }
  };

  const onFindById = async (id: string) => {
    try {
      const response = await eventService.getEventById(id);
      const event = response.data;
      if (event) {
        setEvent(event);
      }
    } catch (error) {
      console.error(error);
      alerts.errorAlert((error as SerializedError).message || EX_SYSTEM);
    }
  };

  return {
    event,
    events,
    findAllEvents,
    onFindById,
    allDataLoaded,
  };
};
