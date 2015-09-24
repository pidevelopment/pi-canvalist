import DS from 'ember-data';

export default DS.Model.extend({
  fname: DS.attr('string'),
  lname: DS.attr('string'),
  photo: DS.attr('string'),
  hasBeenAdded: DS.attr('boolean')
});
