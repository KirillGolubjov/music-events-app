import { createSelector } from "reselect";

import { Genre } from "@/types/genres.model";

import { RootState, EntityState } from "@/redux/app";

export const selectGenresState = (rootState: RootState): EntityState<Genre> => rootState.genre;

export const selectAllGenreData = createSelector(
  [selectGenresState],
  (genresState: EntityState<Genre>): Genre[] => genresState.entities
);

export const selectGenreById = (id: number) => {
  return createSelector([selectAllGenreData], (GenresData: Genre[]): Genre | null => {
    const found: Genre | undefined = GenresData.find(genre => genre.id === id.toString());
    return found ? found : null;
  });
};
