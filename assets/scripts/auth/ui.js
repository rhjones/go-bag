'use strict';

const app = require('../app');

// MESSAGES

const messages = {
  signUpFail: 'Unable to create account.',
  logInFail: 'Unable to log in.',
  logOutFail: 'Unable to log out.',
  passwordChangeFail: 'Unable to change password.',
  passwordChangeSuccess: 'Password changed.',
  getUserFail: 'Unable to access your profile.',
};

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

const signUpFailure = () => {
  renderWarning({message: messages.signUpFail});
  $('#sign-up .auth-button').html('Sign Up');
};

const logInFailure = () => {
  renderWarning({message: messages.logInFail});
  $('#log-in .auth-button').html('Log In');
};

const logOutFailure = () => {
  renderWarning({message: messages.logOutFail});
};

const passwordChangeFailure = () => {
  renderWarning({message: messages.passwordChangeFail});
};

const getUserFailure = () => {
  renderWarning({message: messages.getUserFail});
};

// SIGN UP AND LOG IN

const showSignUp = () => {
  const signUpForm = require('../templates/signUp.handlebars');
  $('.auth-forms').html(signUpForm);
};

const showLogIn = () => {
  const logInForm = require('../templates/logIn.handlebars');
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

const authLoading = () => {
  $('.auth-button').html('<i class="fa fa-spinner fa-spin fa-fw"></i><span class="sr-only">Loading...</span>');
};

// USER PROFILE 

const greetings = [
  '"Adventure is worthwhile."" – Aesop',
  '"The gladdest moment in human life, me thinks, is a departure into unknown lands." – Sir Richard Burton',
  '"People don’t take trips, trips take people." – John Steinbeck',
  '"Life is either a daring adventure or nothing." – Helen Keller',
  '"Not all those who wander are lost." – J.R.R. Tolkien',
  '"I haven’t been everywhere, but it’s on my list." – Susan Sontag',
];

const renderProfile = (data) => {
  if (app.user.id) {
    app.user.lists = data.user.lists;
  } else {
    app.user = data.user;
  }
  app.user.greeting = greetings[Math.floor(Math.random() * greetings.length)];
  let user = app.user;
  const userProfile = require('../templates/userProfile.handlebars');
  $('.view').html(userProfile(user));
};

const toggleChangePassword = () => {
  $('.pwd-form').find('input').val('');
  $('.pwd-form').slideToggle();
};

const passwordChangeSuccess = () => {
  toggleChangePassword();
  renderSuccess({message: messages.passwordChangeSuccess});
};

// "HOME" PAGE

const goHome = () => {
  if (!app.user.id) { 
    const home = require('../templates/home.handlebars');
    $('.view').html(home);
  }
};

// LOG OUT

const logOutSuccess = () => {
  app.user = {
    id: null,
    email: null,
    token: null,
  };
  goHome();
};

module.exports = {
  signUpFailure,
  logInFailure,
  logOutFailure,
  passwordChangeFailure,
  getUserFailure,
  showSignUp,
  showLogIn,
  showAuth,
  authLoading,
  renderProfile,
  toggleChangePassword,
  passwordChangeSuccess,
  goHome,
  logOutSuccess,
};