import Ember from 'ember';
import { request } from 'ic-ajax';

export default Ember.Route.extend({
	actions: {
    create: function() {
    	// create payload for POST
      var campaign = {
      	title: this.controllerFor('campaigns.new').get('title'),
      	description: this.controllerFor('campaigns.new').get('description'),
      	scope: 'PI'
      };
      var token = this.get('session.secure.token');
      return Ember.$.ajax({
      	url: "http://petitions.pidevelopment.org/api/campaigns",
      	type: 'POST',
        contentType: "application/json",
      	data: JSON.stringify(campaign),
      	beforeSend: function(request) {
      		request.setRequestHeader("Authorization", "Bearer " + token);
      	}
      }).then(function(response) {
      	Ember.Logger.info('response from server', response);
      });
    }
  }
});
