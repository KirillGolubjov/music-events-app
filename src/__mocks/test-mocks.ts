export const mockEvent = {
  name: "Test Event",
  id: "123",
  promoter: {
    id: 12,
    name: "hmm",
  },
  classifications: [
    {
      genre: {
        id: 12,
        name: "some",
      },
    },
  ],
  dates: {
    start: {
      localDate: "2023-11-30",
      localTime: "12:00",
      dateTime: "1231",
    },
  },
  _embedded: {
    venues: [
      {
        address: {
          line1: "123 Main St",
        },
        city: {
          name: "Tallinn",
        },
        country: {
          name: "Estonia",
        },
      },
    ],
  },
  images: [
    {
      url: "https://example.com/image.jpg",
      width: 800,
      height: 600,
    },
  ],
};
