import Ember from 'ember';
import Provider from 'torii/providers/base';
import { configurable } from 'torii/configuration';

export default Provider.extend({
  name: 'google-api',
  scope: configurable('scope', 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email'),
  clientId: configurable('clientId'),
  domain: configurable('domain'),
  loadPromise: null,

  open: function() {
    return this.load().then(this.authorize.bind(this));
  },

  load: function() {
    var loadPromise = this.get('loadPromise');

    if (loadPromise == null) {
      loadPromise = this._load();
      this.set('loadPromise', loadPromise);
    }

    return loadPromise;
  }.on('init'),

  _load: function() {
    var originalOnLoad = window.onGoogleApiLoad;

    return new Ember.RSVP.Promise(function(resolve, reject) {
      window.onGoogleApiLoad = function() {
        window.onGoogleApiLoad = originalOnLoad;

        gapi.auth.init(function() {
          Ember.run(null, resolve);
        });
      };

      Ember.$.getScript('//apis.google.com/js/client.js?onload=onGoogleApiLoad').
        fail(function(_, __, exception) {
          Ember.run(null, reject, exception);
        });
    });
  },

  authorize: function() {
    return new Ember.RSVP.Promise((resolve, reject) => {
      gapi.auth.authorize({
        response_type: 'code',
        client_id: this.get('clientId'),
        scope: this.get('scope'),
        hd: this.get('domain')
      }, function(response) {
        if (response != null && response.error != null) {
          Ember.run(null, reject, response.error);
        }
        else {
          Ember.run(null, resolve, response);
        }
      });
    });
  }
});