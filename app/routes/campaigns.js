import Ember from 'ember';
import { request } from 'ic-ajax';

export default Ember.Route.extend({
  model: function() {
    return request("http://petitions.pidevelopment.org/api/campaigns").then(function(response) {
      Ember.Logger.info("GET campaigns", response);
    });
  }
});
