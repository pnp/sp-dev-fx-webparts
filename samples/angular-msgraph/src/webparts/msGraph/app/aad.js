var hello = require('hellojs');

hello.init({

  aad: {
    name: 'Azure Active Directory',
    oauth: {
      version: 2,
      auth: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
      grant: 'https://login.microsoftonline.com/common/oauth2/v2.0/token'
    },
    scope_delim: ' ',
    form: false
  }
});

hello.on('auth.login', function (auth){
  localStorage.auth = angular.toJson(auth.authResponse);
});