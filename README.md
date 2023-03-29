# Project title

A short description of this project. 
What it is about, who are target group and why that project was made. 

# Technologies used

Built with: 
- JS with React JS Framework
- NodeJS with Express Framework

Dependencies (installed with npm): 
- [Axios](https://www.npmjs.com/package/axios): Promise based HTTP client for the browser and node.js
- [Express](https://www.npmjs.com/package/express): Fast, unopinionated, minimalist web framework for Node.js.
- [Cors](https://www.npmjs.com/package/cors) : A Node.js CORS middleware
- [sequelize & sequelize-cli](https://www.npmjs.com/package/sequelize): Node.js tools for SQL database
- [mysql2](https://www.npmjs.com/package/mysql2): MySQL client for Node.js 
- [nodemon](https://www.npmjs.com/package/nodemon): Simple monitor script for use during development of a Node.js app.
- [dotenv](https://www.npmjs.com/package/dotenv): Loads environment variables from .env file

# Setup and usage
* Notes: These instructions are tested in MacOS, while some details might be different for Windows and Linux user.

Follow these steps to get the app ready in your local machine: 

## Step 1: Download/ Clone the whole repo: 
Download link: [Link](https://github.com/haidanglevn/nooflab-recruitment-task/archive/refs/heads/master.zip) 

or

Clone the repo from terminal: 
```console
git clone https://github.com/haidanglevn/nooflab-recruitment-task.git
```

## Step 2: Install dependencies
From the terminal, navigate to the two folders /frontend and /backend. Then run npm install to automatically install all dependencies from their respective package.json file.

```console
cd frontend/
npm install
```

```console
cd backend/
npm install
```

If you follow the steps correctly, you should see 2 new node_modules folder created in both /frontend and /backend, but not at the root folder.

## Step 3: Setup MySQL connection

Follow the steps in this page to set up a local MySQL database:
[Getting Started with MySQL](https://dev.mysql.com/doc/mysql-getting-started/en/). If this is your first time, remember to keep the "root" username and its "password" somewhere you can remember, as we will need this in the next step. 

Next, you have to run log into MySQL database and create a database (I used the name companyDB). You can download tools like DBeaver, or just run this command in the terminal and type the password of the root user (default is "password")

```console
mysql -u root -p
```

Then create a database name companyDB by running CREATE DATABASE statement: 
```console
mysql> CREATE DATABASE companyDB;
Query OK, 1 row affected (0.01 sec)
```

Next, in the /backend folder you can find a ".env.EXAMPLE" files, which contains an example for a .env file. You have to create a .env file with your own variables to make the connection to your local MySQL database (or just remove the ".EXAMPLE" from the name of the given file).

```env
DATABASE = 'companyDB'
USERNAME = 'root'
PASSWORD = 'password'
HOST = '127.0.0.1'
```

## Step 4: Run the server and react app
You have to run the server and React app respectively, by navigating to each folder and run this command npm start.

```console
cd frontend/
npm start
```

```console
cd backend/
npm start
```

Server index.js will run in localhost:4000 by default, while the React app run on localhost:3000. It is important to make sure these ports is not occupied by anything else. 

## Use the React App in the browser
To use the app, go to browser and type 'localhost:3000' in the address bar. You should see the app if all the steps above is done correctly.

image

At Step 1, press the "fetch API data" button. The data from 10 capital postal codes is fetched from the RHP API from this endpoint: 

```js
GET `http://avoindata.prh.fi/bis/v1?totalResults=true&maxResults=20&resultsFrom=0&streetAddressPostCode=[CODE]&companyRegistrationFrom=2014-02-28`
```

This process is run by the server, then the data is stored into your local MySQL database.
Wait until the output field show "Companies data is ready and stored in database! Step 2 is ready."

image

Then at Step 2: you can either click Get All, or select a postal code and click Get data button to show the data from your local database. Data will be in both table (with some columns removed for better viewing) and in JSON format. You can go to the URI ("detailsUri" from the object) of the specific company to get more data.

```js
{"businessId":"3286351-3","name":"TH Pääsykoevalmennukset Oy","registrationDate":"2022-05-10","companyForm":"OY","detailsUri":"http://avoindata.prh.fi/opendata/bis/v1/3286351-3","postalCode":"02100","createdAt":"2023-03-29T08:44:22.000Z","updatedAt":"2023-03-29T08:44:22.000Z"}
```


## Sources 

- [Getting Started with MySQL](https://dev.mysql.com/doc/mysql-getting-started/en/)
- [PRH Open Data](http://avoindata.prh.fi/ytj_en.html#/)
- [How To Use Sequelize with Node.js and MySQL](https://www.digitalocean.com/community/tutorials/how-to-use-sequelize-with-node-js-and-mysql#step-4-creating-associations-using-sequelize)

## Authors and acknowledgment
Dang Le
- GitHub @haidanglevn
- [LinkedIn](https://www.linkedin.com/in/dang-le-hai/)

Teachers at Business College: 

Margit Tennosaar
- GitHub @margittennosaar
- [LinkedIn](https://www.linkedin.com/in/margittennosaar/)

Santosh Kalwar
- GitHub @kalwar
- [LinkedIn](https://www.linkedin.com/in/santoshkalwar/)
