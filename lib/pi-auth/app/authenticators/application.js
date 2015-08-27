import Ember from 'ember';
import ToriiAuthenticator from 'simple-auth-torii/authenticators/torii';
import { request } from 'ic-ajax';

export default ToriiAuthenticator.extend({
  providers: {
    'google-api': function(authResponse) {
      Ember.Logger.info("authResponse", authResponse);
      var code = authResponse.code;
      return request('http://byway.com/api/gplushandler', {
        data: code,
        type: 'POST',
        contentType: 'application/octet-stream; charset=utf-8',
        processData: false
      }).then(function(response) {
        Ember.Logger.info("response", response);
        sessionStorage.setItem('token', response.access_token);
        return { accessToken: response.access_token };
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
    return request('/', { type: 'GET' });
  }
});