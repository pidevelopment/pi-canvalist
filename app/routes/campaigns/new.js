import Ember from 'ember';

export default Ember.Route.extend({
  owner: "",
  title: "Test",
  description: "",
  start: Date.now(),
  end: Date.now() + 1,
  scope: "PI",

  actions: {
    create: function(event) {
      Ember.Logger.info("title", this.get('title'));
    }
  }
});
