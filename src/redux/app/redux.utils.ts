import { HttpRequestError } from "../../types/error.model";

const commonErrorProperties: Array<keyof HttpRequestError> = ["name", "message", "stack", "code"];

export const toSerializedError = (value: any): HttpRequestError => {
  const simpleError: HttpRequestError = {};
  for (const property of commonErrorProperties) {
    if (typeof value[property] === "string") {
      simpleError[property] = value[property];
    }
  }
  return simpleError;
};
