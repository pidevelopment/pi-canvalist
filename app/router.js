import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('campaigns', function() {
  	this.route('new');
  	this.route('view', { path: '/:id' });
  });
  this.route('friends', function() {});
  this.route('profiles', function() {
    this.route('view', { path: '/:id' });
  });
});

export default Router;
