import { screen, render, fireEvent, cleanup } from "@testing-library/react";

import "@testing-library/jest-dom/";
import { EventDetailsCard } from "../pages/context-version/structure/cards/EventDetails.card";

import { mockEvent } from "@/__mocks/test-mocks";

const onCloseMock = jest.fn();

afterEach(() => {
  cleanup();
});

describe("EventDetailsCard", () => {
  it("renders event details", () => {
    render(<EventDetailsCard event={mockEvent} onClose={onCloseMock} />);

    expect(screen.getByText("Test Event")).toBeInTheDocument();
    expect(screen.getByText(/Tallinn/)).toBeInTheDocument();
    expect(screen.getByText(/30.11.2023/)).toBeInTheDocument();
  });

  it("handles button click", () => {
    render(<EventDetailsCard event={mockEvent} onClose={onCloseMock} />);

    fireEvent.click(screen.getByRole("button", { name: "Close details" }));

    expect(onCloseMock).toHaveBeenCalled();
  });
});
