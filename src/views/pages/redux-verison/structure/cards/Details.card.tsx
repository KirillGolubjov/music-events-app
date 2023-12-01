import { FaRegBuilding } from "react-icons/fa";
import { IoCalendar } from "react-icons/io5";

import { Event } from "@/types/event.model";

import { EventImage } from "./Image";

import { STATIC_TEXT } from "@/common/consts";
import { formatJsDate_DD_MM_YYYY, getDayOfWeek, formatJsTimeHH_MM } from "@/common/utils/utils";

interface DetailsProps {
  event: Event;
  onClose: () => void;
}

export const DetailsCard = ({
  onClose,
  event: { name, dates, _embedded, images },
}: DetailsProps): JSX.Element => {
  const { localDate, localTime } = dates.start;
  const { address, city, country } = _embedded.venues[0];

  const parsedDate = new Date(localDate);

  return (
    <div className="container__event">
      <div className="event__details">
        <h2 className="event__title">{name}</h2>
        <p className="event__date">
          <IoCalendar className="date__icon" />
          {getDayOfWeek(parsedDate)}, {formatJsDate_DD_MM_YYYY(parsedDate)} @{" "}
          {formatJsTimeHH_MM(localTime)}
        </p>
        <p className="event__place">
          <FaRegBuilding className="place__icon" />
          {address?.line1}, {city?.name}, {country?.name}
        </p>

        <p className="event__text">{STATIC_TEXT}</p>
        <button className="event__button" type="button" onClick={onClose}>
          Close details
        </button>
      </div>
      <EventImage images={images} />
    </div>
  );
};
