# Sleep Tracker

Sleep Tracker is a mobile-friendly web application that enables you to track your sleep schedule at the push of a button (well, one tap to sleep and one to wake up). You can also see your sleep trends and "sleep debt". `yarn dev` to run the frontend and backend locally.

We use the Google "Firebase" authentication system so that you can link your account to your email address and access your data securely from any device.

An advanced version of Sleep Tracker updated by my incredible partner @esfinkel is currently deployed at https://sleeptracker-7640d.firebaseapp.com.

Sleep Tracker is intended to supplant the mobile apps that I've used, which want to record your snores and offer "expert" recommendations yet lack basic recordkeeping features such as the addition of retroactive data.

Your data will not be sold or given away. If we decide we want to share anonymous data, we will ask for your permission first.

## Installation
Sleep Tracker will run on your browser without any installation or other work. This section is for people who want to contribute to the project.

Once you have cloned the repository, you can work on the [frontend](frontend) and [backend](backend) folders separately.

### Frontend
The frontend uses React and is hosted by [Google Firebase](https://console.firebase.google.com/u/0/). It makes calls to the backend server and also directly to the Firebase authentication portal.

In the frontend folder, run `yarn install` to install the required node modules. The frontend uses
* "react" and "react-dom" to load the website
* "axios" to make requests to the backend
* "firebase" and "react-firebaseui" to enable login
* "bootstrap", "react-bootstrap", and "reactstrap" for UI
* "moment", "react-datepicker", and "react-datetime" for the time selection widget
* "recharts" and "simple-statistics" for the graph and statistics

The files available on GitHub omit some authentication information, so you will need to replace the calls to the backend and to Firebase with dummy data.

Then run `yarn start` to run the app locally.

### Backend
The backend uses express.js and is hosted by [Heroku](https://dashboard.heroku.com/apps). It accesses the Firebase database.

In the backend folder, run `yarn install` to install the required node modules. The backend uses
* "cors" and "express" to allow the frontend to make requests
* "body-parser" to parse requests
* "firebase-admin" to access the database

Again, the files available on GitHub omit some authentication information. If you want the frontend to make real API calls to the backend, you can create your own free Firebase project. Note that some of the files in this repo have urls indicating relevant tutorials or other resources. Then you would update the `const url =` lines in the frontend to point to your localhost server. If you do this, you might as well enable login for the frontend by configuring the "Authentication" section of the Firebase project. Drop the appropriate config jsons into frontend/service-account.json and backend/service-account.json.

Then run `yarn start` to run the backend locally.