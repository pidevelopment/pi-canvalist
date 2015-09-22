import Ember from 'ember';

export default Ember.Component.extend({
  query: "",
  api: "ezdray/v1/ajax",
  results: [],
  isLoading: false,
  keyUp: function (e) {
    // this.set("controller.query", this.get('query'));
    this.sendAction('action', this.get('query'));
  }
});
