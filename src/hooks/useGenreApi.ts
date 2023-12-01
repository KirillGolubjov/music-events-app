import { SerializedError } from "@reduxjs/toolkit";
import { useState } from "react";

import { Genre } from "@/types/genres.model";

import { genreService } from "@/api/genre.service";
import { alerts } from "@/feedback/alerts";
import { EX_SYSTEM } from "@/feedback/messages";

export interface GenreApiHookType {
  genres: Genre[];
  findAllGenres: () => Promise<void>;
}

export const useGenreApi = (): GenreApiHookType => {
  const [genres, setGenres] = useState<Genre[]>([]);

  const findAllGenres = async () => {
    try {
      const response = await genreService.findAllGenres();
      const allGenres = response.data.segment._embedded.genres;
      if (allGenres) {
        setGenres(allGenres);
      }
    } catch (error) {
      console.error(error);
      alerts.errorAlert((error as SerializedError).message || EX_SYSTEM);
    }
  };

  return {
    genres,
    findAllGenres,
  };
};
