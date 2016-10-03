'use strict';

const app = require('../app');

const messages = {
  signUpFail: 'Unable to create account.',
  logInFail: 'Unable to log in.',
  logOutFail: 'Unable to log out.',
  passwordChangeFail: 'Unable to change password.',
  passwordChangeSuccess: 'Password changed.',
};

const greetings = [
  '"Adventure is worthwhile."" – Aesop',
  '"The gladdest moment in human life, me thinks, is a departure into unknown lands." – Sir Richard Burton',
  '"People don’t take trips, trips take people." – John Steinbeck',
  '"Life is either a daring adventure or nothing." – Helen Keller',
  '"Not all those who wander are lost." – J.R.R. Tolkien',
  '"I haven’t been everywhere, but it’s on my list." – Susan Sontag',
];

const home = require('../templates/home.handlebars');
const logInForm = require('../templates/logIn.handlebars');
const signUpForm = require('../templates/signUp.handlebars');

const renderWarning = (message) => {
  const warning = require('../templates/warning.handlebars');
  $('.message').html(warning(message));
  $('.message').children().delay(3000).fadeToggle('slow');
};

const renderSuccess = (message) => {
  const success = require('../templates/success.handlebars');
  $('.message').html(success(message));
  $('.message').children().delay(3000).fadeToggle('slow');
};

const logInFailure = () => {
  renderWarning({message: messages.logInFail});
};

const logOutFailure = () => {
  renderWarning({message: messages.logOutFail});
};

const passwordChangeFailure = () => {
  renderWarning({message: messages.passwordChangeFail});
};

const signUpFailure = () => {
  renderWarning({message: messages.signUpFail});
};

const renderProfile = (data) => {
  app.user = data.user;
  app.user.greeting = greetings[Math.floor(Math.random() * greetings.length)];
  let user = app.user;
  console.log('app.user is', user);
  const userProfile = require('../templates/userProfile.handlebars');
  $('.view').html(userProfile(user));
};

const logOutSuccess = () => {
  app.user = null;
  console.log('logged out');
};

const toggleChangePassword = () => {
  $('.pwd-form').slideToggle();
};

const passwordChangeSuccess = () => {
  toggleChangePassword();
  renderSuccess({message: messages.passwordChangeSuccess});
};

const showSignUp = () => {
  $('.auth-forms').html(signUpForm);
};

const showLogIn = () => {
  console.log('clicked on log in link');
  $('.auth-forms').html(logInForm);
};

const showAuth = (authForm) => {
  const auth = require('../templates/auth.handlebars');
  $('.view').html(auth);
  if (authForm === 'sign-up') {
    showSignUp();
  } else if (authForm === 'log-in') {
    showLogIn();
  }
};

const goHome = () => {
  if (app.user.id) {
    renderProfile(app);
  } else {
    $('.view').html(home);
  }
};

const logOut = () => {
  app.user = {
    id: null,
    email: null,
    token: null,
  };
  goHome();
};

module.exports = {
  logInFailure,
  logOutFailure,
  passwordChangeFailure,
  signUpFailure,
  renderProfile,
  logOutSuccess,
  passwordChangeSuccess,
  showSignUp,
  showLogIn,
  showAuth,
  goHome,
  logOut,
  toggleChangePassword,
};