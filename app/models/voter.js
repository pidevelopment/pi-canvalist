import DS from 'ember-data';

export default DS.Model.extend({
  sign_status: DS.attr('string'),
  voterid: DS.attr('string'),
  fulladdress: DS.attr('string'),
  lastname: DS.attr('string'),
  firstname: DS.attr('string')
});
