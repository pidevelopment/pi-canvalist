/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'pi-canvalist',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {}
    },

    APP: {},
    
    sassOptions: {
      includePaths: ['bower_components/materialize/sass']
    },

    contentSecurityPolicy: {
      'default-src': "accounts.google.com",
      'script-src': "'self' apis.google.com",
      'font-src': "'self'",
      'connect-src': "'self' byway.com",
      'img-src': "'self'",
      'style-src': "'self'",
      'media-src': "'self'",
      'frame-src': "accounts.google.com"
    },

    torii: {
      providers: {
        'google-api': {
          clientId: '837903891646.apps.googleusercontent.com',
          domain: 'localhost:4200'
        }
      }
    },

    'simple-auth': {
      authorizer: 'authorizer:application'
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
