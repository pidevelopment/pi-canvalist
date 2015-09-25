import DS from 'ember-data';

export default DS.Model.extend({
  sign_status: DS.attr('string'),
  fulladdress: DS.attr('string'),
  lastname: DS.attr('string'),
  firstname: DS.attr('string'),
  hasSigned: Ember.computed('sign_status', function() {
    if(this.get('sign_status') === 'Signed') {
      return true;
    }
    return false;
  }),
});
