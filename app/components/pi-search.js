import Ember from 'ember';

export default Ember.Component.extend({
  query: "",
  keyUp: function (/*e*/) {
    // this.set("controller.query", this.get('query'));
    this.sendAction('action', this.get('query'));
  }
});
