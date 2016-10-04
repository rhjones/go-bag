'use strict';

const ui = require('./ui');

const onLearnMore = () => {
  event.preventDefault();
  ui.learnMore();
};

const addHandlers = () => {
  $('.view').on('click', '.learn-more', onLearnMore);
};

module.exports = {
  addHandlers,
};
