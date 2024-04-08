https://events-music.netlify.app/

# Event Discovery App

This is a React application built with Vite that allows users to discover and explore music events. The app integrates with the Ticketmaster Discovery API to fetch information about events, genres, and venues.

## Features

- **Event Search:** Users can search for music events based on keywords.
- **Genre Filtering:** Events can be filtered by genre to narrow down preferences.
- **Event Details:** Detailed information about each event, including date, venue, and additional details.
- **Responsive Design:** The application is designed to be responsive and work seamlessly on various devices.

## Getting Started

To run the project locally, follow these steps:

1. Clone the repository: `git clone <repository-url>`
2. Install dependencies: `npm install`
3. Set up environment variables: Create a `.env` file with the following content:
   ```env
   VITE_BASE_URL=https://app.ticketmaster.com/discovery/v2/
   VITE_API_KEY=YOUR_TICKETMASTER_API_KEY
   ```
4. Run the app `npm start`

## Environment Variables

VITE_BASE_URL: Base URL for the Ticketmaster Discovery API.
VITE_API_KEY: Your Ticketmaster API key for authentication.

## Technologies Used

• React
• React Context
• TypeScript
• Redux
• Redux Toolkit
• Vite
• Ticketmaster Discovery API

## Context/Redux Switcher

You have the flexibility to switch between using Context and Redux in this application. Simply uncomment/comment the relevant import statements and render the appropriate component (`AppRedux` or `AppContext`) based on your preferred state management solution in the `main.tsx` file.

## Contributor

#Kirill Golubjov

Happy exploring music events!
