import express from 'express';
import 'dotenv/config';
import * as path from 'path';
import { create } from 'express-handlebars';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { createConnection } from 'typeorm';
import { SOURCE_PATH } from './const.js';
import { home } from './controllers/home.js';
import HandlebarsHelpers from './lib/HandlebarsHelpers.js';
import entities from './models/index.js';
import {
  deleteCategory,
  getCategory,
  postCategory,
  updateCategory,
} from './controllers/api/category.js';
import {
  deleteToDoItem,
  getToDoItem,
  postToDoItem,
  updateToDoItem,
} from './controllers/api/toDoItem.js';
import { getUsers } from './controllers/api/user.js';
import {
  login,
  register,
  postRegister,
  postLogin,
  logout,
} from './controllers/authentication.js';
import validationAuthentication from './middleware/validation/authentication.js';
import { jwtAuth } from './middleware/jwtAuth.js';

const app = express();
app.use(express.static('public'));

/**
 * Import the body parser
 */

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * Import the cookie parser
 */

app.use(cookieParser());

/**
 * Handlebars Init
 */

const hbs = create({
  helpers: HandlebarsHelpers,
  extname: 'hbs',
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(SOURCE_PATH, 'views'));

/**
 * App Routing
 */

app.get('/', jwtAuth, home);

app.get('/category/:id', home);
// need to add midelleware
app.get('/login', login);
app.get('/register', register);
app.post('/register', ...validationAuthentication, postRegister, register);
app.post('/login', ...validationAuthentication, postLogin, login);
app.post('/logout', logout);

/**
 * API Routing
 */

app.get('/api/user', getUsers);

app.get('/api/category', getCategory);
app.post('/api/category', postCategory);
app.delete('/api/category/:id', deleteCategory);
app.put('/api/category', updateCategory);

app.get('/api/toDoItem', getToDoItem);
app.post('/api/toDoItem', postToDoItem);
app.delete('/api/toDoItem/:id', deleteToDoItem);
app.put('/api/toDoItem', updateToDoItem);

/**
 * Create database connection and start listening
 */

createConnection({
  type: process.env.DATABASE_TYPE,
  database: process.env.DATABASE_NAME,
  // logging: true,
  entities,
  synchronize: true,
}).then(() => {
  app.listen(process.env.PORT, () => {});
});
