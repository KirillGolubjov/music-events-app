import { createSlice, AsyncThunk, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";

import { HttpRequestError } from "@/types/error.model";
import { Genre, emptyGenre } from "@/types/genres.model";

import { EntityState, toSerializedError } from "@/redux/app";

import { genreService } from "@/api/genre.service";

type FindAllGenresAsynchThunk = AsyncThunk<Genre[], void, { rejectValue: HttpRequestError }>;

type GenreAsynchThunk = FindAllGenresAsynchThunk;

const initialState: EntityState<Genre> = {
  error: null,
  entity: emptyGenre,
  entities: [],
  loading: false,
  allLoaded: false,
  page: 0,
  pageSize: 0,
};

export const findAllGenres: FindAllGenresAsynchThunk = createAsyncThunk<
  Genre[],
  void,
  { rejectValue: HttpRequestError }
>("genre/findAllGenres", async (_, thunkAPI): Promise<Genre[]> => {
  try {
    const response: AxiosResponse = await genreService.findAllGenres();
    return response.data.segment._embedded.genres;
  } catch (error) {
    throw thunkAPI.rejectWithValue(toSerializedError(error));
  }
});

export const genreSlice = createSlice({
  name: "genre",
  initialState: initialState,
  reducers: {
    genreResetMessages: state => {
      state.error = null;
      state.loading = false;
      state.entity = emptyGenre;
      state.entities = [];
    },
  },
  extraReducers: builder => {
    [findAllGenres].forEach((thunk: GenreAsynchThunk) => {
      builder.addCase(thunk.pending, state => {
        state.error = null;
        state.loading = true;
      });

      builder.addCase(thunk.rejected, (state, action) => {
        state.error = action.payload as HttpRequestError;
        state.loading = false;
      });
    });

    builder.addCase(findAllGenres.fulfilled, (state, action) => {
      state.entities = action.payload as Genre[];
      state.loading = false;
      state.error = null;
    });
  },
});

export const genreActions = genreSlice.actions;
export default genreSlice.reducer;
