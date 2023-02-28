# Thrive Developer Documentation
## How to obtain the source code
  * Download the code from the repository.
  * Navigate to frontend directory and run ```npm install``` to install node dependencies.
  * Navigate to backend directory and run ```chmod +x ./gradlew``` then run ```./gradlew dependencies``` to install the gradle dependencies.

## Layout of directory structure
  * backend folder:
    * gradle/wrapper
      * Contains gradle files
    * res
      * Contains information about the Firebase
    * src
      * main\java
        * connection
          * Contains code for the database connection and the Spark server, as well as the code for fetching and updating data in the database.
        * datastructures
          * Contains User class
          * calendar
            * Contains Event, Frequency, and Task classes
          * community
            * Contains Comment and Post classes
      * test
        * Contains tests to check connection between the backend code and the database, and to test that the code is correctly updating/fetching data from the database.
  * frontend folder: File organization heavily based on [this repo](https://github.com/alan2207/bulletproof-react)
    * public
      * public assets
    * src 
      * components/Layout
        * shared components used across the entire application
      * features
        * feature based modules
      * routes
        * routes configuration
  * ReadME:
    * Information regarding web application
     
## How to build the software
  * **frontend:** Navigate to frontend directory and run ```npm start``` to start react server.
  * **backend:** Navigate to backend directory and run ```./gradlew runSpark``` to start the spark server.
## How to test the software
  * **frontend:** Navigate to frontend directory and run ```npm test``` to run frontend tests.
  * **backend:** Navigate to backend directory and run the command ```./gradlew junitTests``` to run backend tests.
## How to add new tests
  * **frontend:** To add tests for a particular feature, first navigate to that feature's subdirectory under ```frontend/src/features/```. Once in the feature subdirectory, navigate to ```routes/__tests__/``` and add a new test file with the naming convention ```TestName.test.java```. Alternatively, you can also add individual tests to the test files that already exist there.
  * **backend:** Add tests on the database using Junit in the DatabaseTest.java file.
## How to build a release of the software
  * Following the steps above to build and test the software.
  * Run and manually test out the use cases.
  * If no issues arise, commit and push the code with the changes.  
