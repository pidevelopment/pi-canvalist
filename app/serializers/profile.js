import Ember from 'ember';
import DS from 'ember-data';

export default DS.RESTSerializer.extend({
  primaryKey: 'myid',
  normalizePayload: function(payload) {
    Ember.Logger.info("normalize profile payload", payload);
    var profile = payload.data[0];
      profile.id = profile.myid;
      return {"profile": profile};
  }
});
