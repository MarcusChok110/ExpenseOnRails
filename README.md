# Expense On Rails

"Expense On Rails" is an expense tracker web-application built with Next.js and Express. The data is persisted by connecting to a MongoDB database. Material-UI was used to create the user interface, with Redux Toolkit employed to manage state.

## Pages

### Home

![Home page](https://i.imgur.com/Y8F0dPM.png)

### Account

![Account page](https://i.imgur.com/xdLizxI.png)

### Transactions

![Transactions page 1](https://i.imgur.com/MlQ148n.png)
![Transactions page 2](https://i.imgur.com/LaDofNj.png)

### Dashboard

![Dashboard page 1](https://i.imgur.com/gs44THK.png)
![Dashboard page 2](https://i.imgur.com/W7OqANM.png)

### Profile

![Profile page](https://i.imgur.com/7ZXHNUy.png)

### Register

![Register page](https://i.imgur.com/TwrXbzF.png)

### Login

![Login page](https://i.imgur.com/R8zUoIF.png)

## Frontend Dependencies

```
    "@material-ui/core": "^4.11.3",
    "@material-ui/icons": "^4.11.2",
    "@reduxjs/toolkit": "^1.5.0",
    "chart.js": "^2.9.4",
    "fontsource-roboto": "^4.0.0",
    "next": "10.0.6",
    "react": "17.0.1",
    "react-chartjs-2": "^2.11.1",
    "react-dom": "17.0.1",
    "react-redux": "^7.2.2",
    "redux-undo": "^1.0.1"
```

## Database Schemas (Models)

### User

```
{
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  account: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
  firstName: { type: String },
  lastName: { type: String },
}
```

### Account

```
{
  categories: { type: [String], required: true, default: defaultCategories },
  balance: { type: Number, required: true, default: 0 },
  budget: { type: Number, required: true, default: 0 },
  expenses: { type: Number, required: true, default: 0 },
  transactions: [
    { type: Schema.Types.ObjectId, ref: 'Transaction', required: true },
  ],
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}
```

### Transaction

```
{
  account: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  date: { type: Date, required: true },
  description: { type: String },
  title: { type: String, required: true },
  type: { type: String, required: true, enum: ['expense', 'revenue'] },
}
```

## API Endpoints (/api)

### Users

- `GET /users/` — returns a user based on Bearer token in Header
- `GET /users/:id` — returns a user based on id
- `PUT /users/:id` — updates a user in the database

### Accounts

- `GET /accounts/:id` — returns account info based on id
- `PUT /accounts/:id` — updates account info in the database

### Transactions

- `GET /transactions/` — returns all transaction info for given user from Bearer token in Header
- `POST /transactions/` — create a new transaction for the the current user in the database
- `GET /transactions/:id` — returns single transaction info from id
- `PUT /transactions/:id` — updates account info in the database
- `DELETE /transactions/:id` — deletes transaction from the database

## Authentication Endpoints (/auth)

- `POST /register` — registers a new user and account in the database
- `POST /login` — authenticate user and return a JWT
- `DELETE /delete` — delete a user and their account from the database
- `/ping` — ANY HTTP method/verb; used to test whether JWT token is valid and user is logged in

## Backend Dependencies

```
    "bcryptjs": "^2.4.3",
    "compression": "^1.7.4",
    "cookie-parser": "^1.4.5",
    "cors": "^2.8.5",
    "debug": "~2.6.9",
    "dotenv": "^8.2.0",
    "express": "~4.16.1",
    "express-validator": "^6.9.2",
    "helmet": "^4.4.1",
    "http-errors": "^1.6.3",
    "jsonwebtoken": "^8.5.1",
    "mongoose": "^5.11.15",
    "morgan": "~1.9.1",
    "passport": "^0.4.1",
    "passport-jwt": "^4.0.0",
    "passport-local": "^1.0.0"
```

## Local Installation

Currently, the application is not deployed or hosted on the web. To use it, you must install it locally. Firstly, ensure you have Node and npm installed on your system. Then, follow the following steps:

1. Download / clone the repository.
2. cd to frontend and backend directories and run `npm install` to install the respective dependencies.
3. Create a MongoDB database and set up a .env file in the backend directory with the following values:

```
PORT=8000
NODE_ENV=development
MONGO_DB=<YOUR_MONGODB_DATABASE_URI>
MONGO_USER=<YOUR_MONGODB_DATABASE_ADMIN_USERNAME>
MONGO_PASSWORD=<YOUR_MONGODB_DATABASE_ADMIN_PASSWORD>
MONGO_DBNAME=<YOUR_MONGODB_DATABASE_NAME>
JWT_SECRET=<YOUR_JWT_SECRET>
```

4. To run the application in development, cd back to the root directory and run the command `npm run dev` to run the app in development mode.
5. To run the application in production, cd back to the root and run `npm run build` to compile the applications, and then run `npm start`.
6. The frontend should now be running on http://localhost:3000/ and the API on http://localhost:8000/!

## Todo

- Implement undo / redo for redux state
- Make more graphs in dashboard for separate expense / revenue transactions
- Implement account balance value and create a graph for it
