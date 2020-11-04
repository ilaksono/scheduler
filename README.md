# Scheduler Project by IL

Scheduler is a simple, single-page interview diary. Uses react with express, http and WebSocket scripting with scss and html.

## Purpose

**_BEWARE:_ This application was published for learning purposes. It is _not_ intended for use in production-grade software.**

This project was created and published by me as part of my learnings at Lighthouse Labs.

## Usage

**Client Server Deployed on Netlify**
**Accessible by internet network at:**
[https://5fa21cd27ce8c30007112e06--reverent-jepsen-d3213f.netlify.app/](https://5fa21cd27ce8c30007112e06--reverent-jepsen-d3213f.netlify.app/)

## Requires/Imports

**express**
API for creating server environment and request, response CRUD methods

**body-parser**
Interpret keys and values in request data to object format

**react**
Front-end framework to render html elements

## Getting Started

- Install all dependencies (using the `npm install` command).
- Run the development web server using the `npm start` command.

## Final Product

!["Appointment - Form"](https://github.com/ilaksono/scheduler/blob/master/docs/app-form.png)

## Documentation

**The following function componenets can be found in /src/components:**

- `Application`: returns all elements in the single page app
- `Button`: calculate time since post, returns string to be appended in script
- `DayList`: use loop iteration to append all tweets to html section container
- `DayListItem`: use loop iteration to append all tweets to html section container
- `InterviewerList`: use loop iteration to append all tweets to html section container
- `InterviewerListItem`: use loop iteration to append all tweets to html section container
- `DayList`: use loop iteration to append all tweets to html section container

**/src/components/Appointment:**

- `index`: returns container that holds the other 7 possible routes, and transition state
- `Form`: input appointment details
- `Show`: displays created appointment
- `Error`: displays error message
- `Status`: displays loading message
- `Empty`: shows button to create button
- `Header`: shows start time for appointment
- `Confirm`: shows confirmation modal

**The following hooks can be found in /src/hooks:**

- `useApplicationData()`: returns parent state for Application, and methods to create/delete interviews to pass in child components
- `useVisualMode()`: returns an instance of state - transition method, and current mode for each appointment article

## Dependencies

- react
- react-dom
- Node 10.16 or above
- axios
- normalize.css
- classnames

## dev-Dependencies

- node-sass
- babel-loader
- prop-types

## Testing and mocks

- Cypress
- storybook
- Jest
- react-testing-library

## Stretch

- Websockets - All clients receieve response on update
- Deploy client server - Netlify @ https://5fa21cd27ce8c30007112e06--reverent-jepsen-d3213f.netlify.app/
- Deploy API server - Heroku: 
[build.environment]
  REACT_APP_API_BASE_URL = "https://scheduler-l.herokuapp.com/"
  REACT_APP_WEBSOCKET_URL = "wss://scheduler-l.herokuapp.com/"

