import React from "react";

import { Image } from "@/types/event.model";

import { getBestQualityImage } from "@/common/utils/event-utils";

interface EventImageProps {
  images: Image[];
}

export const EventImage: React.FC<EventImageProps> = ({ images }) => {
  const backgroundImage = images ? getBestQualityImage(images)?.url : undefined;

  return <div className="event__image" style={{ backgroundImage: `url(${backgroundImage})` }} />;
};
