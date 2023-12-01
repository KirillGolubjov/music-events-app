import { cleanup } from "@testing-library/react";

import { INIT_EVENT_ID } from "@/common/consts";

const onFindByIdMock = jest.fn();
const setSelectedEventIdMock = jest.fn();

afterEach(() => {
  cleanup();
});

describe("EventMainCard", () => {
  it("toggles event details correctly", () => {
    const onToggleEventDetails = (id: string) => {
      if (INIT_EVENT_ID === id) {
        setSelectedEventIdMock(null);
      } else {
        onFindByIdMock(id);
        setSelectedEventIdMock(id);
      }
    };

    onToggleEventDetails("someEventId");
    expect(onFindByIdMock).toHaveBeenCalledWith("someEventId");
    expect(setSelectedEventIdMock).toHaveBeenCalledWith("someEventId");

    onFindByIdMock.mockClear();
    setSelectedEventIdMock.mockClear();

    onToggleEventDetails("initialEventId");
    expect(onFindByIdMock).not.toHaveBeenCalled();
    expect(setSelectedEventIdMock).toHaveBeenCalledWith(null);
  });
});
