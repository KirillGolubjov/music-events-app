import React from "react";

import { Image } from "@/types/event.model";

import { getBestQualityImage } from "@/common/utils/event-utils";

interface ImageProps {
  images: Image[];
}

export const EventImage: React.FC<ImageProps> = ({ images }) => {
  const backgroundImage = images ? getBestQualityImage(images)?.url : undefined;

  return <div className="event__image" style={{ backgroundImage: `url(${backgroundImage})` }} />;
};
