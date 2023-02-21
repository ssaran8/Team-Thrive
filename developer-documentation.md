# Thrive Developer Documentation
## How to obtain the source code
  * Download the code from the repository
  * Run NPM instal to download dependencies
  * Run the command ./gradlew dependencies to install the dependencies

## The layout of your directory structure
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
  * NPM start
  * run the command ./gradlew runSpark to start the server
## How to test the software
  * run the command ./gradlew junitTests
## How to add new tests
  * Add tests on the database using Junit in the DatabaseTest.java file
## How to build a release of the software
  * Following the steps above to build and test the software
  * Run and manually test out the use cases
  * If no issues arise, commit and push the code with the changes.  