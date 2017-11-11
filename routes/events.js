// @flow
import Express from 'express';
import sendResponse from '../helpers/responses';

const route = Express.Router();

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

route.get('/', (req, res) => {
  console.log('in /events route');
  console.log('got events', events);
  return sendResponse(res, 200, { events });
});

// routes.get('/featured-events', (req, res) => {
//   res.json(events.slice(2));
// });
//
// routes.get('/upcoming-special', (req, res) => {
//   /*
//    * get events that are special and have not happened yet
//   */
// });
export default route;
