import Ember from 'ember';
import DS from 'ember-data';

export default DS.RESTAdapter.extend({
	host: 'http://petitions.pidevelopment.org',
	namespace: 'api',
	session: Ember.computed(function() {
		return this.container.lookup('simple-auth-session:main');
	}),
	headers: Ember.computed('session', function() {
		console.log('session:', this.get('session.secure.token'));
		return {
			"Authorization": "Bearer " + this.get('session.secure.token')
		}
	})
});
