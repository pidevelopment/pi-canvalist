import DS from 'ember-data';

export default DS.Model.extend({
  lastName: DS.attr('string'),
  fullAddress: DS.attr('string'),
  voterRegDate: DS.attr('string'),
  voterId: DS.attr('string'),
  status: DS.attr('string'),
  legDistrict: DS.attr('string'),
  countyCode: DS.attr('string'),
  congressDistrict: DS.attr('string'),
  lastVoted: DS.attr('string'),
  gender: DS.attr('string'),
  birthDate: DS.attr('string'),
  fullName: DS.attr('string'),
  countyId: DS.attr('string')
});
