import DS from 'ember-data';

export default DS.RESTSerializer.extend({
  primaryKey: 'myid',
  normalizePayload: function(payload) {
    if(payload.records != 0) {
      var friends = {
        "friends": payload.data
      }
      return friends;
    }
    return;
  }
});
