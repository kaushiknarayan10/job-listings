# job-listings
Web Application with ReactJS Front-End and Express and NodeJS Backend, connected to a MySQL Database that shows Job listings for a given list of Job Boards

# Setup
To make it work in your local, download the code and run ```npm install``` and then run ```yarn run dev``` to start the Client and Server simultaneously.

# Requirements
- Listed in ```package.json```. You will need a MySQL Database configured.
- Create a. ```.env``` file and enter the Username, Password, Database and Host details in that.
- Place the CSV File that has all the Job Postings in the home folder and add the following entry to the ```.env``` file.
- - ```MY_JOBS_FILE: <File name of your CSV File.csv>```
- Place the JSON file that has all the Job Board names in the home folder and add the following entry to the ```.env``` file.
- - ```MY_JOB_SOURCES: <File name of your JSON File.json>```
