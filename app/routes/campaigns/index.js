import Ember from 'ember';
import { request } from 'ic-ajax';

export default Ember.Route.extend({
  model: function() {
  	var token = this.get('session.content.secure.token');
    return request("http://petitions.pidevelopment.org/api/campaigns", {
      beforeSend: function(request) {
        request.setRequestHeader("Authorization", 'Bearer ' + token);
      }
    }).then(function(response) {
			Ember.Logger.info("GET campaigns", response);
		});;
  }
});
