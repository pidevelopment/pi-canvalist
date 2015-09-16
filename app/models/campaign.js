import DS from 'ember-data';

export default DS.Model.extend({
  owner: DS.attr('string'),
  title: DS.attr('string'),
  description: DS.attr('string'),
  start: DS.attr('date'),
  end: DS.attr('date'),
  scope: DS.attr('string')
});

// “owner”: “<uuid of requester>”   <— must mactch the id determined in the authorization header.
// “title”:”<short title of campaign>”
// “description”: “<Much longer description.  HTML ok”  <— not required
// “start”: <unix timestamp of start of campaign>  <— no defaults.
// “end”:”<unix timestamp of end of campaign> <— no defaults.
// “scope”: “<scope of the voter database>”  <— Defaults to “PI” for pierce county.
