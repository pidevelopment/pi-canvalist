import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';
import { request } from 'ic-ajax';

export default Ember.Route.extend(ApplicationRouteMixin, {
	actions: {
		login: function() {
			this.get('session').authenticate('authenticator:application', 'google-api', {});
		}
	}
});
