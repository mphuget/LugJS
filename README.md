# LugJS

LugJS is a e-/m-Commerce platform written in Node.js, Express and MongoDB for the backend.

This is an ongoing project so stay up to date to find the latest. It is based on another repository
from my Github [nodejs-api-auth-backend](https://github.com/mphuget/nodejs-api-auth-backend.git), which 
provides the basic of authentication and API server.

## Used tools

Developed under:
- Node.js 16.13.0
- NPM 8.1.0
- MongoDB 5.0.2

One of the first step when developing a Node.js project, especially a REST API server, is to be able to accept
requests from clients and authenticate the users whether to only give access to whom granted or to record the use.
Apart from usual actions (sign up/in/out), it is possible to protect routes (see profile routes) with passport

## Features

- Data stored in MongoDB

### Shop

- Create a Shop
- Read a Shop (for the logged user)
- Read all the Shop (for the logged user)
- Update a Shop
- Close a Shop
- Read all the Department from a Shop

### Department

- Create a Department and link it to a Shop
- Update a Department
- Read all the Product for a Department
- Delete a Department


### Product

- Create a Product and link it to a Department
- Update a Product
- Read a Product
- Delete a Product

### Feedback

- Create a Feedback and link it to the corresponding Product
- Read a Feedback
- Update a Feedback

### User authentication 

- Sign up with a name and a password
- Sign in with a name and a password
- Sign out
- Protected routes (Profile) through JWT

## How to run

1. Clone the repository:

git clone https://github.com/mphuget/LugJS.git

2. Go to the repository:

cd LugJS

3. Install the dependencies (removed from Git repository):

npm install

4. Create a directory for MongoDB data (select where to store them)

mkdir ./data

5. Run the MongoDB server from another directory than the data one (in a first terminal)

mongod --dbpath ./data

6. Rename the .env-example file into .env

7. Change the content of the .env file. The critical data are port on which the server is
running, and the MongoDB URL

8. On another terminal, run the server

node server.js

If everything went smoothly, you should see a running on port message and connected to database messages

The different routes were tested under Postman

