'use strict';

// const app = require('../app');

const failure = () => {
  console.log('fail');
};

const success = (data) => {
  console.log(data);
};

const getAllLists = (lists) => {
  console.log(lists);
  const allLists = require('../templates/allLists.handlebars');
  $('.all-lists').html(allLists(lists));
};

module.exports = {
  failure,
  success,
  getAllLists,
};