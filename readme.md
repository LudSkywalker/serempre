# Serempre test api rest
## Environment Variables
You have 2 ways for run the app
-First
If you are just in develop, and didn't need run the production script(npm start) you can create a file named ".env" into the server folder
-Second
For run all scripts without problem in environments of prodution and develop, you need to export the enviroment variables into your console or terminal

For bowth ways the values are this ("If you are in the first way, just copy and paste the next text into the file '.env' " ):

#Port of the server, if server fail connected to this, just test with other number like 3000,4343, etc

PORT=4000

#Put in this the host of your database example: localhost

MYSQL_HOST= localhost

#keep this DB to can run script of create and reset database

MYSQL_DB=bykfnabpbn8vqi39xlct

#Put your username of the database manager MYSQL , by default :root

MYSQL_USER=root

#Put your password of the database manager MYSQL, by default is null

MYSQL_PASSWORD=

## DATABASE
Create an db with de name "bykfnabpbn8vqi39xlct" into MYSQL 
## Scripts
First move into server and open your terminal there,after type "npm i" to download all modules

npm run start: It's the prodution script, run the server
npm run dev: It's the prodution develep script, run the server with hot reload
npm run loadData: This script create or restart from default your database 
