'use strict';

// user require with a reference to bundle the file and use it in this file
// var example = require('./example');

// use require without a reference to ensure a file is bundled
const homeEvents = require('./home/events.js');
const authEvents = require('./auth/events.js');
const listEvents = require('./lists/events.js');

const home = require('./templates/home.handlebars');

$(() => {
  $('.view').html(home);
  homeEvents.addHandlers();
  authEvents.addHandlers();
  listEvents.addHandlers();
});
