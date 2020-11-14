# react-voting 
Voting project in React Js and google firebase. This project uses firebase functions for routing and database activities such as CRUD, image storage and managing store (delete unnecessary images to avoid over usage of firebase storage). Material UI is used on front end. Check out codes and give it a try !

Check out Demo [here](https://voting-functions.web.app/)

## Features
* Add Candidate to Account catelogue 
* Create Contest
* Vote Candidate on contest (allowed to vote only one candidate on contest)
* Switch Candidate vote (if already voted any candidate on contest)
* Comment on contest
* Firebase realtime-database 
* Firebase functions for managing operations i.e. CRUD, managing firebase store 

## Work / Data Flow
* Social Login / Signup (google, facebook, twitter and github)
* Add Candidate to your account candidate catelogue
* Create Contest 
  * Create  contest adding contest title and description
  * Add candidate to contest from your candidate catelogue
* Vote Candidate Contest (allowed to vote only one candidate)
* Comment on contest

## How it looks?
![react-justcontests](react-justcontests.gif)
## Available Scripts

In the project directory, you can run:

### `yarn start` or `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
