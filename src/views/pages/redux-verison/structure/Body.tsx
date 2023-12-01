import { Event } from "@/types/event.model";

import { MainCard } from "./cards/Main.card";

interface BodyProps {
  searchedEvents: Event[];
  selectedGenre: string | null;
}

export const Body = ({ searchedEvents, selectedGenre }: BodyProps): JSX.Element => {
  return (
    <main className="main">
      <div className="container__body">
        <MainCard searchedEvents={searchedEvents} selectedGenre={selectedGenre} />
      </div>
    </main>
  );
};
