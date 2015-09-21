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
      var route = this;
      if (!campaign.title) {
        Ember.Logger.info("no title");
        return false
      }
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
        if(response.data.length) {
          var campaignID = response.data[0].id;
          return route.transitionTo('campaigns.view', campaignID);
        }
      });
    }
  }
});
