# **Happy-Gym**

## **Overview:**

This is a **exercise-related beginner project** which helps record user's exercise time and keeps track of his/ her personal fitness progress.

User needs to register for an account before using the web application, so the personal information and progress will be recorded.

## **Features:**

- Record the exercise time in sports logs manually or automatically through the timer

- Check the fitness progress through the charts in profile page

- Create new workout/ sports events and let other users enroll in those events to participate

- Locate the fitness rooms of LCSD(Leisure and Cultural Services Department) on the map

## **Setup for the Project:**

1. Install the dependencies in package.json.
   
        cd web-server/
        npm install

2. Follow `example.sql` to create a new **PostgreSQL** database for storing restaurants and food data.

3. Follow `example.env` to create new `.env` file for connection to database.

4. Follow `ATTENDANCETable.sql`, `EVENTTable.sql`, `GOOGLEMAPTable.sql`, `SPORTSLOGSTable.sql`, `USERTable.sql` and `YOUTUBETable.sql` to create tables of the database.

5. Run the **Express** server.
   
        npm start

    or

        npx ts-node server.ts
    
6. Go to http://localhost:2000/ and try it out!

## **Contributors:**

-   William Chi
-   Hang Tsui
-   Chapman Wong