# Welcome to Scratch

This project was built by Chris Abbondandelo as a way for golfers to find new courses, have a digital scorecard, and keep track of their stats to improve their game

## In order to run this app on your machine...

### Google Places/Autocomplete API
You will need to create a google developer account and enable the Google Maps JavaScript API and the Google Places API

https://console.cloud.google.com

Create an API key that is linked to the following Google API services
- Google Maps JavaScript API
- Goolge Places API

In the index.html file under the projects Public folder, replace the marked line for personal API key on line 8 marked (***INSERT GOOGLE MAPS API KEY HERE!!! ****)

### Rapid API - Golf Course Finder
You will need to create a free account with Rapid API in order to access the free "Golf Course Finder" API

https://rapidapi.com/golfambit-golfambit-default/api/golf-course-finder

In the APIManager.js file under the projects Components folder, replace the marked line for personal API Key on line 8 marked (***INSERT RAPID API KEY HERE!!! ****)

### Local JSON Database
You will need to install json-server in the project root folder using `npm i --save json-server`

CD in to the project's 'API' folder and run the following command in the terminal
- npx json-server --watch database.json -p 9000

### Starting the application
You will need to open a new terminal window and CD into the project root folder

Run the following command in the terminal 'npm start'

### Issues
If you are not rendering a list of cities/courses when searching, check your API keys for errors or unwanted whitespaces and that they have the correct access in the Google Developer Console

If you are not able to perform CRUD operations check to see that your database is live at http://localhost:9000/

## Motivation
The main reason I created this app was to explore the use of public API's, and also becasue I need to improve my golf game.  This project presented many challenges and head-scratchers, I am very proud of what I have created so far. I plan to improve to projects statistical tracking and implement a .NET Web API to store data. Thank you for taking a peek at something I worked hard on!
