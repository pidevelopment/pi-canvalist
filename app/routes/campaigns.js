import Ember from 'ember';
import { request } from 'ic-ajax';

export default Ember.Route.extend({
  model: function() {
  	// return Ember.$.getJSON("http://petitions.pidevelopment.org/api/campaigns");
  	var token = this.get('session.secure.token');
		console.log('token:', token);

    return request("http://petitions.pidevelopment.org/api/campaigns", {
      beforeSend: function(request) {
        request.setRequestHeader("Authorization", 'Bearer ' + token);
      }
    }).then(function(response) {
      Ember.Logger.info("GET campaigns", response);
    });
  }
});
