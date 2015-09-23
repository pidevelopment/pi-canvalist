import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
  model: function() {
    var store = this.store;
    return Ember.RSVP.hash({
      campaigns: store.findAll('campaign')
    });
  }
});
