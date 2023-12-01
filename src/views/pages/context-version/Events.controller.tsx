import { EventProvider } from "./Events.context";
import { EventsBody, EventsFooter, EventsHeader } from "./structure";

export const EventController = (): JSX.Element => {
  return (
    <EventProvider>
      <EventControllerInternal />
    </EventProvider>
  );
};

const EventControllerInternal = (): JSX.Element => {
  return (
    <>
      <EventsHeader />
      <EventsBody />
      <EventsFooter />
    </>
  );
};
