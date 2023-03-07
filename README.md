# Team-Thrive
CSE 403
Winter 2023

## Project Goal:
Thrive will be a web application that promotes productivity by allowing users to enter tasks that will be sorted based on priority and difficulty. Two of our stretch goals are to create a mobile application and to generate recommendations for tasks.

### Major Features
* Login Page: Users sign in or sign up to the app (Operational)
* Calendar: View past, current, and upcoming tasks (Semi-Operational)
* Reward System: Users are rewarded points for completing tasks, and there are a fixed number of points that can be earned per day. Users can redeem points for certain rewards. (Not operational)
* Social Page: A community page, where users can post their progress, like and comment on posts, and support one another (Not operational)

### Technologies Used
We are using React.js for our web application in the frontend. We are using Firebase and Spark for our backend services.


### Repository Layout:
This repository will has 3 primary folders. 
#### frontend
The frontend folder is where all the frontend code will go. The code here contains the React application, which is made up of many React components. 

To run the frontend web app locally:
  1. Clone the repo
  2. Open a terminal in the project directory
  3. Navigate to the frontend directory
  4. Install NPM
  5. Install dependencies   
    * `npm install`
  6. Run this command:   
    * `npm start`

#### backend
The backend folder is where all the backend code is. The code here will be primarily in Java.

To start the Spark Server, launch the gradle task runSpark from the terminal, using the command :
*./gradlew runSpark* from the backend folder.

To text the backend, launch the gradle task junitTests from the terminal, using the command :
*./gradlew junitTests* from the backend folder.
#### reports
The reports folder will contain weekly status reports.

## Documentation
[Developer Documentation](https://github.com/ssaran8/Team-Thrive/blob/main/DevoloperAndUserDocs/developer-documentation.md)     
[User Documentation](https://github.com/ssaran8/Team-Thrive/blob/main/DevoloperAndUserDocs/user-documentation.md)
