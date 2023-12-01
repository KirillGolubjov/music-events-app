import { AsyncThunk, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";

import { HttpRequestError } from "@/types/error.model";
import { Event, emptyEvent } from "@/types/event.model";

import { toSerializedError, EntityState } from "@/redux/app";

import { eventService } from "@/api/event.service";

type FindAllEventsAsynchThunk = AsyncThunk<
  Event[],
  { page: number; pageSize: number },
  { rejectValue: HttpRequestError }
>;

type FindEventAsynchThunk = AsyncThunk<Event, string, { rejectValue: HttpRequestError }>;

type EventAsynchThunk = FindAllEventsAsynchThunk | FindEventAsynchThunk;

const initialState: EntityState<Event> = {
  error: null,
  entity: emptyEvent,
  entities: [],
  loading: false,
};

export const findAllEvents: FindAllEventsAsynchThunk = createAsyncThunk<
  Event[],
  { page: number; pageSize: number },
  { rejectValue: HttpRequestError }
>("event/findAllEvents", async ({ page, pageSize }, thunkAPI): Promise<Event[]> => {
  try {
    const response: AxiosResponse = await eventService.findAllEvents(page, pageSize);
    return response.data._embedded?.events;
  } catch (error) {
    throw thunkAPI.rejectWithValue(toSerializedError(error));
  }
});

export const findEventById: FindEventAsynchThunk = createAsyncThunk<
  Event,
  string,
  { rejectValue: HttpRequestError }
>("event/findEvent", async (id: string, thunkAPI): Promise<Event> => {
  try {
    const response: AxiosResponse = await eventService.getEventById(id);
    return response.data;
  } catch (error) {
    throw thunkAPI.rejectWithValue(toSerializedError(error));
  }
});

export const eventSlice = createSlice({
  name: "event",
  initialState: initialState,
  reducers: {
    eventResetMessages: state => {
      state.error = null;
      state.loading = false;
      state.entity = emptyEvent;
      state.entities = [];
    },
  },
  extraReducers: builder => {
    [findAllEvents, findEventById].forEach((thunk: EventAsynchThunk) => {
      builder.addCase(thunk.pending, state => {
        state.error = null;
        state.loading = true;
      });

      builder.addCase(thunk.rejected, (state, action) => {
        state.error = action.payload as HttpRequestError;
        state.loading = false;
      });
    });

    builder.addCase(findAllEvents.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload?.length) {
        state.entities = [...state.entities, ...action.payload];
      } else {
        state.loading = true;
      }
      state.error = null;
    });

    builder.addCase(findEventById.fulfilled, (state, action) => {
      state.entity = action.payload as Event;
      state.loading = false;
      state.error = null;
    });
  },
});

export const eventActions = eventSlice.actions;
export default eventSlice.reducer;
