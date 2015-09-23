import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return this.store.findRecord('campaign', params.id);
  },

  actions: {
    handleData: function(e) {
      Ember.Logger.info("handling data in the route!", e);
    }
  }
});
