import Ember from 'ember';

export default Ember.Controller.extend({
  currentYear: function() {
    return new Date().getFullYear();
  }
});
