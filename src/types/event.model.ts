export interface Event {
  id: string;
  name: string;
  dates: {
    start: {
      localDate: string;
      localTime: string;
      dateTime: string;
    };
  };
  images: Image[];
  promoter: {
    id: number;
    name: string;
  };
  classifications: {
    genre: {
      id: number;
      name: string;
    };
  }[];
  _embedded: {
    venues: {
      address: {
        line1: string;
      };
      city: {
        name: string;
      };
      country: {
        name: string;
      };
    }[];
  };
}

export interface Image {
  url: string;
  width: number;
  height: number;
}

export const emptyEvent: Event = {
  id: "",
  name: "",
  dates: {
    start: {
      localDate: "",
      localTime: "",
      dateTime: "",
    },
  },
  images: [],
  promoter: {
    id: 0,
    name: "",
  },
  classifications: [
    {
      genre: {
        id: 0,
        name: "",
      },
    },
  ],
  _embedded: {
    venues: [
      {
        address: {
          line1: "",
        },
        city: {
          name: "",
        },
        country: {
          name: "",
        },
      },
    ],
  },
};
