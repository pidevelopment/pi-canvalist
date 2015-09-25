import DS from 'ember-data';

export default DS.RESTSerializer.extend({
  primaryKey: 'voterid',
  normalizePayload: function(payload) {
    Ember.Logger.info("normalize voter payload", payload);
    if(payload.records !== 0) {
        return {"voters": payload.data};
    }



  }
});
