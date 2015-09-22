import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    updateQuery: function(query) {
      Ember.Logger.info("updateQuery", query);
    }
  }
});
