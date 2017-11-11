// @flow
import express from 'express';
// import selectn from 'selectn';
import morgan from 'morgan';
import bodyParser from 'body-parser';

import sendResponse from './helpers/responses';
import models from './models';

const env = process.env.NODE_ENV || 'development';
const app = express();

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.configure(() => {
//   app.use((req, res, next) => {
//     // TODO maybe get some standards
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     next();
//   });
// });

// use morgan to log requests to the console
env && 'development' && app.use(morgan('dev')); // TODO or prod


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Headers', 'accept, authorization, content-type, x-requested-with, credentials');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  res.setHeader('Access-Control-Allow-Origin', req.header('origin'));
  next();
});

const routes = express.Router();
app.use('/', routes);
routes.use('/auth', require('./routes/auth').default);
routes.use('/events', require('./routes/events').default);

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

routes.use(async (req, res, next) => {
  try {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (!token) next();
    const tokenInDatabase = await models.findToken(token);
    if (!tokenInDatabase) next();
    const email = models.validateToken(token);
    if (!email) {
      await models.token.deleteToken(token);
      next();
    }
    const user = await models.findByEmail(email);
    if (!user) next();
    req.authenticated = true;
    req.admin = user.admin;
    next();
  } catch (err) {
    sendResponse(res, 500);
  }
});


const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
