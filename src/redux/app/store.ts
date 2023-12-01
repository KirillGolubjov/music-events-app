import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import { eventSlice } from "../features/event/event.slice";
import { genreSlice } from "../features/genre/genre.slice";

export const rootReducer = () => {
  return {
    [eventSlice.name]: eventSlice.reducer,
    [genreSlice.name]: genreSlice.reducer,
  };
};

export const store = configureStore({
  reducer: rootReducer(),
  middleware: getDefaultMiddleware =>
    import.meta.env.DEV ? getDefaultMiddleware().concat(logger) : getDefaultMiddleware(),
  devTools: import.meta.env.DEV,
});

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
