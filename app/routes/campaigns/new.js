import Ember from 'ember';

export default Ember.Route.extend({
  owner: "",
  title: "",
  description: "",
  start: new Date,
  end: new Date,
  scope: "PI"
});
