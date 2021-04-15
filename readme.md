# Serempre test api rest
## Environment Variables
You have 2 ways for run the app
- First
If you are just in develop, and didn't need run the production script(npm start) you can create a file named ".env" into the server folder
- Second
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

- npm run start: It's the prodution script, run the server

- npm run dev: It's the prodution develep script, run the server with hot reload

- npm run loadData: This script create or restart from default your database 

## About the test, my experience (español)
Lamento primero que todo la tardanza, esta es debido a que me enfoque en hacer el proyecto lo mas escalable posible,debo declarar que tuve algunas dificultades en la parte de cargar los archivos csv, especialmente la parte de expresiones regulares, debido a que para no mandar miles de querys y lograr la mayor eficiencia, compile todos los datos y hasta el reseteo de la base de datos, manualmente, transformando de .csv a .sql de manera eficiente, tambien tengo un intento no esfiente usando el modulo csvtojson junto a  mysql query, pero demandaba muchas peticiones al host de la base de datos, esto se puede ver en al carpeta /server/database en los achivos que inciian con loadData.

Tambien para ahorrar tiempo y automatizar trabajo realice los siguientes cambios a el ejercicio postulado

- Cambien el nombre del archivo Order_Details.csv a OrderDetails.csv
- Cambie del archivo Products.cvs los valores True False a  0 y 1
- En el archivo empployee.csv el primer dato hace referencia al segundo, que aun no ha sido creado, por lo mismo, coloque este primer dato de ultimas en las filas del cvs
- Agrege un orden a los archivos .csv cambiendo su nombre de la siguiente manera= ordenHex+"."nombreOriginal, donde ordenHex son numeros del 1 al 13 en hexadecimal siguiendo el orden de que datos se deben insertar primero para no tener fallas con las llaves foraneas en MySQL
- Cambie el modelo de la base de datos para que el dato Products.SuppliersID pudiera estar nulo, esto con el fin de cumplir el ultimo endpoint que pedia borrar datos de suppliers