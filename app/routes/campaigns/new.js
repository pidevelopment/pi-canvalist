import Ember from 'ember';

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
      console.log('...', campaign);
    }
  }
});
