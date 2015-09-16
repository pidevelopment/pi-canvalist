import Ember from 'ember';
import ToriiAuthenticator from 'simple-auth-torii/authenticators/torii';
import { request } from 'ic-ajax';

export default ToriiAuthenticator.extend({
	providers: {

		'google-api': function(authResponse) {
			// return authorization code to pi-api to get token
			return request('http://petitions.pidevelopment.org/api/gplushandler', {
				data: authResponse.code,
				type: 'POST',
				contentType: 'application/octet-stream; charset=utf-8',
				processData: false
			}).then(function(response) {
        Ember.Logger.info("login response", response);
				// use token to get user info from google api
				return request('https://www.googleapis.com/oauth2/v2/userinfo', {
					beforeSend: function(request) {
						request.setRequestHeader("Authorization", 'Bearer ' + response.access_token);
					}
				}).then(function(resp) {
					// save the token at session.secure.user
					return { user: resp };
				});
			});
		}

	},

	authenticate: function(provider, options) {
		return this.torii.open(provider, options).then((authResponse) => {
			return this.get('providers')[provider](authResponse);
		});
	},

	restore: function(data) {
		return Ember.RSVP.resolve(data);
	},

	invalidate: function(data) {
		return request('http://petitions.pidevelopment.org/api/gplushandler', { type: 'DELETE' });
	}
});
