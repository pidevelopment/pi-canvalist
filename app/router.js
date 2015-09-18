import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  // this.route('list', function() {
  //   this.route('voter', { path: ':id' });
  // });
  this.route('voters');
  this.route('voter', { path: '/voters/:id' });
  this.route('campaigns', function() {
  	this.route('new');
  	// this.route('view', { path: '/:id' });
  });
});

export default Router;
