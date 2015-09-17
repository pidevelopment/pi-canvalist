import Base from 'simple-auth/authorizers/base';
import Ember from 'ember';

export default Base.extend({
  header: function() {
    return `Token token="${this.get('session.accessToken')}"`;
  }.property('session.accessToken'),

  authorize: function(jqXHR) {
  	console.log('I GOT HERE', this.get('session'));
    if (!Ember.isBlank(this.get('session.accessToken'))) {
      jqXHR.setRequestHeader('Authorization', this.get('header'));
      console.log('jqXHR', jqXHR);
    }
  }
});