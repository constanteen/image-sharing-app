import Image from "../types/Image";

export const sortImages = (images: Image[]) => {
  return images.sort((a: Image, b: Image) => {
    if (new Date(a.date as Date) < new Date(b.date as Date)) {
      return 1;
    }
    if (new Date(a.date as Date) > new Date(b.date as Date)) {
      return -1;
    }
    return 0;
  });
};