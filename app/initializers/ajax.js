import Ember from 'ember';

export function initialize(/* container, application */) {
	Ember.$.ajaxPrefilter(function(options) {
		options.headers = {
			'Accept': 'application/json',
			'X-Requested-With': 'XMLHttpRequest',
      'Authorization': 'Meow'
		};
	});
}

export default {
  name: 'ajax',
  initialize: initialize
};
