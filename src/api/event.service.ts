import { httpCommon } from "./http-client";

const findAllEvents = (page: number, pageSize: number) =>
  httpCommon.get(
    `/events?countryCode=FI&classificationId=KZFzniwnSyZfZ7v7nJ&page=${page}&size=${pageSize}`
  );

const getEventById = (id: string) => httpCommon.get(`/events/${id}`);

export const eventService = {
  findAllEvents,
  getEventById,
};
