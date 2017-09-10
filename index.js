// @flow
import express from 'express';
import selectn from 'selectn';
import morgan from 'morgan';
import bodyParser from 'body-parser';

import sendResponse from './helpers/responses';
import models from './models';

const env = process.env.NODE_ENV || 'development';
const app = express();

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
env && 'development' && app.use(morgan('dev')); // TODO or prod

const routes = express.Router();

const events = [
  {
    title: 'All Day Event',
    allDay: true,
    start: new Date(2017, 8, 0),
    end: new Date(2017, 8, 1),
    desc: 'an all day event!',
    link: 'http://www.google.com',
    location: 'starbucks',
    special: false,
    featured: false,
    imageUrl: null,
  },
  {
    title: 'Long Event',
    start: new Date(2017, 8, 7),
    end: new Date(2017, 8, 10),
    desc: 'an all day event!',
    link: 'http://www.google.com',
    location: 'starbucks',
    special: false,
    featured: false,
    imageUrl: null,
  },

  {
    title: 'DTS STARTS',
    start: new Date(2016, 7, 13, 0, 0, 0),
    end: new Date(2016, 7, 20, 0, 0, 0),
    desc: 'an all day event!',
    link: 'http://www.google.com',
    location: 'starbucks',
    special: true,
    featured: true,
    imageUrl: 'http://res.cloudinary.com/dfts7qlgf/image/upload/v1501639882/vjeverica/dev/IMG_0349.jpg',
  },

  {
    title: 'DTS ENDS',
    start: new Date(2016, 9, 6, 0, 0, 0),
    end: new Date(2016, 9, 13, 0, 0, 0),
    desc: 'an all day event!',
    link: 'http://www.google.com',
    location: 'starbucks',
    special: false,
    featured: false,
    imageUrl: null,
  },

  {
    title: 'Some Event',
    start: new Date(2017, 8, 9, 0, 0, 0),
    end: new Date(2017, 8, 9, 0, 0, 0),
    desc: 'an all day event!',
    link: 'http://www.google.com',
    location: 'starbucks',
    special: false,
    featured: false,
    imageUrl: null,
  },
  {
    title: 'Conference',
    start: new Date(2017, 8, 11),
    end: new Date(2017, 8, 13),
    desc: 'Big conference for important people',
    desc: 'an all day event!',
    link: 'http://www.google.com',
    location: 'starbucks',
    special: false,
    featured: false,
    imageUrl: null,
  },
  {
    title: 'Meeting',
    start: new Date(2017, 8, 12, 10, 30, 0, 0),
    end: new Date(2017, 8, 12, 12, 30, 0, 0),
    desc: 'Pre-meeting meeting, to prepare for the meeting',
    desc: 'an all day event!',
    link: 'http://www.google.com',
    location: 'starbucks',
    special: false,
    featured: false,
    imageUrl: null,
  },
  {
    title: 'Lunch',
    start: new Date(2017, 8, 12, 12, 0, 0, 0),
    end: new Date(2017, 8, 12, 13, 0, 0, 0),
    desc: 'Power lunch',
    link: 'http://www.google.com',
    location: 'starbucks',
    special: false,
    featured: false,
    imageUrl: null,
  },
  {
    title: 'Meeting',
    start: new Date(2017, 8, 12, 14, 0, 0, 0),
    end: new Date(2017, 8, 12, 15, 0, 0, 0),
    desc: 'an all day event!',
    link: 'http://www.google.com',
    location: 'starbucks',
    special: false,
    featured: false,
    imageUrl: null,
  },
  {
    title: 'Happy Hour',
    start: new Date(2017, 8, 12, 17, 0, 0, 0),
    end: new Date(2017, 8, 12, 17, 30, 0, 0),
    desc: 'Most important meal of the day',
    link: 'http://www.google.com',
    location: 'starbucks',
    special: true,
    featured: false,
    imageUrl: 'http://res.cloudinary.com/dfts7qlgf/image/upload/v1501639882/vjeverica/dev/IMG_0349.jpg',
  },
  {
    title: 'Dinner',
    start: new Date(2017, 8, 12, 20, 0, 0, 0),
    end: new Date(2017, 8, 12, 21, 0, 0, 0),
    desc: 'an all day event!',
    link: 'http://www.google.com',
    location: 'starbucks',
    special: false,
    featured: true,
    imageUrl: null,
  },
  {
    title: 'Birthday Party',
    start: new Date(2017, 8, 13, 7, 0, 0),
    end: new Date(2017, 8, 13, 10, 30, 0),
    desc: 'an all day event!',
    link: 'http://www.google.com',
    location: 'starbucks',
    otherThing: 'hopefully will not break',
    special: true,
    featured: true,
    imageUrl: 'http://res.cloudinary.com/dfts7qlgf/image/upload/v1501639882/vjeverica/dev/IMG_0349.jpg',
    // recurringId - id of the recurring event
  },
];

/*
 Recurring event
 id - primary
 active - boolean; user can toggle this off to remove the recurring event
 firstInstance - date (the date it was created for)
 lastInstance - date (the last date it *could* be on)
 active - boolean; setting to false will make it stop appearing in the calendar
 type - 'daily' | 'monthly' | 'weekly'

 When the recurring event is created, it will also create a bunch of other events
 Each of these can be individually overriden, and from each thing will have
 the opportunity to remove the event
 Can also reschedule the recurring event

 If firstinstance changes, it will update all of the
*/

 /*
  * Creates a new account
  * Input: email, password
  * Output: token
  */
routes.post('/auth/signup/', async (req, res) => {
  try {
    const email = selectn('email', req.body);
    const password = selectn('password', req.body);
    if (!email) sendResponse(res, 400, 'Email required for signup');
    if (!password) sendResponse(res, 400, 'Password required for signup');
    const accountAlreadyExists = await models.account.checkIfEmailExists(email);
    if (accountAlreadyExists) sendResponse(res, 400, 'An account already exists with that email address');
    await models.account.createAccount(email, password);
    // TODO add token to database
    const token = await models.token.addToken(email);
    if (!token) sendResponse(res, 500);
    sendResponse(res, 201, { token });
  } catch (err) {
    sendResponse(res, 500);
  }
});

/*
 * Authenticate user by email and password
 * Input: email, password
 * Output: token
 */
routes.post('/auth/login', async (req, res) => {
  try {
    const email = selectn('email', req.body);
    const password = selectn('password', req.body);
    if (!email) sendResponse(res, 400, 'Email required for login');
    if (!password) sendResponse(res, 400, 'Password required for login');
    const loginValid = await models.account.checkValidLogin(email, password);
    if (!loginValid) sendResponse(res, 400, 'Incorrect email or password');
    const token = await models.token.addToken(email);
    sendResponse(res, 201, { token });
  } catch (err) {
    sendResponse(res, 500);
  }
});

routes.get('/all-events', (req, res) => {
  console.log('in /all-events route');
  res.json(events);
});

routes.get('/featured-events', (req, res) => {
  res.json(events.slice(2));
});

routes.get('/upcoming-special', (req, res) => {
  /*
   * get events that are special and have not happened yet
  */
});

routes.use(async (req, res, next) => {
  try {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (!token) sendResponse(res, 403);
    // TODO validate that token is in the database
    const userEmail = models.token.validateToken(token);
    if (!userEmail) {
      await models.token.deleteToken(token);
      sendResponse(res, 403);
    }
    const user = await models.account.findByEmail(userEmail);
    if (!user) sendResponse(res, 403);
    req.token = token;
    req.authenticated = true;
    req.admin = user.admin;
    next();
  } catch (err) {
    sendResponse(res, 500);
  }
});

routes.post('auth/logout', async (req, res) => {
  try {
    const { token } = req;
    const tokenDeleted = await models.token.deleteToken(token);
    if (!tokenDeleted) sendResponse(res, 500);
    sendResponse(res, 201);
  } catch (err) {
    sendResponse(res, 500);
  }
});

app.use('/', routes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
