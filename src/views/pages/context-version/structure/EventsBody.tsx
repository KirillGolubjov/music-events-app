import { EventMainCard } from "./cards/EventMain.card";

export const EventsBody = (): JSX.Element => {
  return (
    <main className="main">
      <div className="container__body">
        <EventMainCard />
      </div>
    </main>
  );
};
