import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    Ember.Logger.info("params", params);
    var store = this.store;
    return store.find('friend', params.id);
  },

  actions: {
    removeFriend: function(friend) {
      Ember.Logger.info("remove friend", friend);
      var route = this;
      return this.pidevApi.get('ezdray/v1/users/dropfriend/' + friend.id, {},
        function(response) {
          // success
          Ember.Logger.info("successfully removed friend", response);
          route.store.deleteRecord(friend);
          route.transitionTo('friends');
        },
        function(response) {
          // error
          Ember.Logger.info("failed to remove friend", response);
        },
        this.get('session.secure.token')
      );
    }
  }
});
