import Ember from 'ember';

export function currentYear(/*params, hash*/) {
  return new Date().getFullYear();
}

export default Ember.Helper.helper(currentYear);
