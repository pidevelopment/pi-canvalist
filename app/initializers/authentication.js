import ApplicationAuthenticator from '../authenticators/application';  
import ApplicationAuthorizer from '../authorizers/application';

export default {
	name: 'authentication',
	before: 'simple-auth',
	initialize: function(registry, application) {
		application.register('authorizer:application', ApplicationAuthorizer);
		application.register('authenticator:application', ApplicationAuthenticator);
		application.inject('authenticator:application', 'torii', 'torii:main');
  }
};
