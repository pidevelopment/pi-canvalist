import DS from 'ember-data';

export default DS.RESTSerializer.extend({
	normalizePayload: function(payload) {
		if (payload.records !== 0) {
			return { "campaigns": payload.data };
		}
		return;
	}
});
