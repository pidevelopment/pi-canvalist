import Ember from 'ember';
import { request } from 'ic-ajax';

export default Ember.Component.extend({
  value: "",
  results: [],
  keyUp: function (e) {
    Ember.Logger.info("keyup", e.keyCode);
    var value = this.get('value');
    return request('http://petitions.pidevelopment.org/api/vrlookup?query=' + value, {
      type: 'GET'
    }).then(function(response) {
      Ember.Logger.info("response", response);
    });
  }
});
