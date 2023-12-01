import { Image } from "@/types/event.model";

export const getBestQualityImage = (images: Image[]): Image | null => {
  if (!images || images.length === 0) {
    return null;
  }
  const sortedImages = images.slice().sort((a, b) => b.width * b.height - a.width * a.height);
  return sortedImages[0];
};
