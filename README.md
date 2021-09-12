# Todo API Node.js and Mongo DB

![](https://img.shields.io/badge/License-MIT-yellow.svg) ![](https://img.shields.io/badge/Version-1.0-green.svg)

[![Youtube Video](./thumbnail.png)](https://www.youtube.com/watch?v=EMyJrINHkyY)


## List of endpoints

| Request Method | Endpoint | Description |
| ------------- | -------- | ----------- |
| GET | /todo | Get all todos |
| POST | /todo/create | Create a todo |
| PUT | /todos/:id | Update a todo |
| DELTE | /todos/:id | Delete a todo |

## Steps to setup in locallly

1. Clone the repository
```
  git clone https://github.com/nstack-in/todo-api-node-js-mongo.git
```
2. Install dependencies
```
npm install
```
3. Modily `.env` file and add your mongodb server url
4. Run the server
```
npm start
```

## List of dependencies

| Dependency | Version | Description |
| ---------- | ------- | ----------- |
| [express](https://expressjs.com/) | 4.17.1 | Node.js web application framework |
| [mongoose](https://mongoosejs.com/) | 6.0.5 | MongoDB object modeling tool for Node.js |
| [dotenv](https://www.npmjs.com/package/dotenv) | 10.0.0 | Load environment variables from a .env file into process.env |
| [nodemon](https://www.npmjs.com/package/nodemon) | 2.0.12 | Node.js runtime monitor and restart server |


## List of authors

- [@nitishk72](https://www.github.com/nitishk72)
- [@nstack-in](https://www.github.com/nstack-in)
