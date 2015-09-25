import Ember from 'ember';
import DS from 'ember-data';

export default DS.RESTSerializer.extend({
  primaryKey: 'myid',
  normalizePayload: function(payload) {
    Ember.Logger.info("payload", payload);
    // if(payload.records == 1) {
    //   Ember.Logger.info("payload is 1");
    //   return { "friend": payload.data[0]};
    // }
    if(payload.records !== 0) {
      Ember.Logger.info("payload is not 0");
      var friends = payload.data;
      var normalizedFriends = [];
      for (var i = friends.length - 1; i >= 0; i--) {
        var friend = friends[i].friend_profile;
        friend.id = friend.myid;
        normalizedFriends.push(friend);
      }
      return { "friends": normalizedFriends };
    }
    Ember.Logger.info("payload is 0");
    return;
  }
});
