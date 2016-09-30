'use strict';

// const app = require('../app');

const failure = () => {
  console.log('fail');
};

const success = (data) => {
  console.log(data);
};

module.exports = {
  failure,
  success,
};