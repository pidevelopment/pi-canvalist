import Ember from 'ember';
import { request } from 'ic-ajax';

export default Ember.Component.extend({
  value: "",
  results: [],
  keyUp: function (e) {
    this.set('results', []);
    var component = this;
    Ember.Logger.info("keyup", e.keyCode);
    var value = this.get('value');
    if (value.length) {
      return request('http://petitions.pidevelopment.org/api/vrlookup?query=' + value, {
        type: 'GET'
      }).then(function(response) {
        Ember.Logger.info("response", response);
        if(response.data.length) {
          var resultsArray = [];
          for (var i = response.data.length - 1; i >= 0; i--) {
            resultsArray.push(response.data[i]);
          };
          component.set('results', resultsArray);
        }
        Ember.Logger.info("results", component.get('results'));
      });
    }
  }
});
