import Ember from 'ember';
import { request } from 'ic-ajax';

export default Ember.Route.extend({
  model: function(model) {
  	var token = this.get('session.content.secure.token');
    return request("http://petitions.pidevelopment.org/api/campaigns/" + model.id, {
      beforeSend: function(request) {
        Ember.Logger.info("request", request);
        request.setRequestHeader("Authorization", 'Bearer ' + token);
      }
    }).then(function(response) {
			Ember.Logger.info("GET single campaign", response);
      if(response.data) {
        Ember.Logger.info("single campaign response data", response.data);
        return response.data[0];
      }
		});;
  },

  actions: {
    handleData: function(e) {
      Ember.Logger.info("handling data in the route!", e);
    }
  }
});
