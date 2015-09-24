import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    // return this.get('session.secure.user.friends_status');
    return this.store.findAll('friend');
    // var store = this.store;
    // return this.pidevApi.get('ezdray/v1/users/friends', {},
    //   function(response) {
    //     // success
    //     Ember.Logger.info("successfully got friends", response);
    //     response.forEach(function(friend) {
    //       Ember.Logger.info("friend loop", friend);
    //       friend = friend.friend_profile;
    //       friend.id = friend.myid;
    //       store.createRecord('friend', friend);
    //     });
    //     return store.findAll('friend');
    //   },
    //   function(response) {
    //     // error
    //     Ember.Logger.info("failed to get friends", response);
    //   },
    //   this.get('session.secure.token')
    // );
  }
});
