import { httpCommon } from "./http-client";

const findAllGenres = () => httpCommon.get("/classifications/KZFzniwnSyZfZ7v7nJ");

export const genreService = {
  findAllGenres,
};
