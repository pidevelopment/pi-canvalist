import Ember from 'ember';
import { request } from 'ic-ajax';

export default Ember.Route.extend({
	actions: {
    create: function() {
    	// create payload for POST
      var campaign = {
      	owner: this.get('session.secure.token'),
      	title: this.controllerFor('campaigns.new').get('title'),
      	description: this.controllerFor('campaigns.new').get('description'),
      	start: Date.now(),
      	end: Date.now() + 1,
      	scope: 'PI'
      };
      console.log(campaign)
      return Ember.$.ajax({
      	url: "http://petitions.pidevelopment.org/api/campaigns",
      	type: 'POST',
      	data: campaign,
      	beforeSend: function(request) {
      		request.setRequestHeader("Authorization", "Bearer " + campaign.owner);
      	}
      }).then(function(response) {
      	Ember.Logger.info('......', response);
      });
    }
  }
});
