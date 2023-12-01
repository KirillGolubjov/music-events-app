import { createSelector } from "reselect";

import { Event } from "@/types/event.model";

import { RootState, EntityState } from "@/redux/app";

export const selectEventsState = (rootState: RootState): EntityState<Event> => rootState.event;

export const selectAllEventData = createSelector(
  [selectEventsState],
  (eventsState: EntityState<Event>): Event[] => eventsState.entities
);

export const selectEventById = (id: string) => {
  return createSelector([selectAllEventData], (EventsData: Event[]): Event | null => {
    const found: Event | undefined = EventsData.find(event => event.id === id);
    return found ? found : null;
  });
};
