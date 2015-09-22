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

    contentSecurityPolicy: {
      'default-src': "accounts.google.com",
      'script-src': "'self' apis.google.com",
      'font-src': "'self' fonts.gstatic.com",
      'connect-src': "'self' ws://localhost:7000 localhost:7000 byway.com https://www.googleapis.com/oauth2/v2/userinfo *.pidevelopment.org",
      'img-src': "'self' *.googleusercontent.com data:",
      'report-uri':"'localhost'",
      'style-src': "'self' 'unsafe-inline' styles.kushpin.com fonts.googleapis.com",
      'frame-src': "accounts.google.com"
    },

    torii: {
      providers: {
        'google-api': {
          clientId: '75436597455-oonvpgir5pnummj7o012i839rh03babt.apps.googleusercontent.com',
          domain: 'http://petitions.pidevelopment.org'
        }
      }
    },

    'simple-auth': {
      authorizer: 'authorizer:application',
      routeAfterAuthentication: 'campaigns',
      // crossOriginWhitelist: ['http://petitions.pidevelopment.org']
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    ENV.torii.providers['google-api'].domain = "http://localhost:4200";
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
