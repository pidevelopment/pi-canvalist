import Ember from 'ember';
import { request } from 'ic-ajax';

export default Ember.Component.extend({
  value: "",
  results: [],
  isLoading: false,
  keyUp: function (e) {
    this.sendAction('handleData', e);
    this.set('results', []);
    this.set('isLoading', true);
    var component = this;
    var campaignID = this.get('campaign');
    Ember.Logger.info("keyup", e.keyCode);
    var value = this.get('value');
    if (value.length) {
      return request('http://petitions.pidevelopment.org/api/vrlookup?query=' + value + '&campaign=' + campaignID, {
        type: 'GET',
        beforeSend: function(request) {
          var token = component.get('session.content.secure.token');
          request.setRequestHeader("Authorization", 'Bearer ' + token);
        }
      }).then(function(response) {
        Ember.Logger.info("response", response);
        if(response.data.length) {
          var resultsArray = [];
          for (var i = response.data.length - 1; i >= 0; i--) {
            response.data[i].hasSigned = response.data[i].sign_status === "Not Signed" ? false : true;
            console.log(response.data[i]);
            resultsArray.push(response.data[i]);
          }
          component.set('results', resultsArray);
        }
        component.set('isLoading', false);
        Ember.Logger.info("results", component.get('results'));
      });
    }
    component.set('isLoading', false);
  },

  actions: {
    markAsSigned: function(voter) {
      var component = this;
      var campaignID = this.get('campaign');
      var voterID = voter.voterid;

      return request('http://petitions.pidevelopment.org/api/campaigns/marksigned/' + campaignID + '/' + voterID, {
        type: 'GET',
        beforeSend: function(request) {
          var token = component.get('session.content.secure.token');
          request.setRequestHeader("Authorization", 'Bearer ' + token);
        }
      }).then(function(response) {
        Ember.Logger.info("mark signed response", response);
      });
    },
    markAsUnsigned: function(voter) {
      var component = this;
      var campaignID = this.get('campaign');
      var voterID = voter.voterid;
      return request('http://petitions.pidevelopment.org/api/campaigns/marknotsigned/' + campaignID + '/' + voterID, {
        type: 'GET',
        beforeSend: function(request) {
          var token = component.get('session.content.secure.token');
          request.setRequestHeader("Authorization", 'Bearer ' + token);
        }
      }).then(function(response) {
        Ember.Logger.info("mark not signed response", response);
      });
    }
  }
});
