import DS from 'ember-data';

export default DS.Model.extend({
	description: DS.attr('string'),
	end: DS.attr('date'),
	start: DS.attr('date'),
	scope: DS.attr('string'),
	title: DS.attr('string')
});

// “owner”: “<uuid of requester>”   <— must mactch the id determined in the authorization header.
// “title”:”<short title of campaign>”
// “description”: “<Much longer description.  HTML ok”  <— not required
// “start”: <unix timestamp of start of campaign>  <— no defaults.
// “end”:”<unix timestamp of end of campaign> <— no defaults.
// “scope”: “<scope of the voter database>”  <— Defaults to “PI” for pierce county.
