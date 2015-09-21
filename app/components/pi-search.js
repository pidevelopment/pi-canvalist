import Ember from 'ember';

export default Ember.Component.extend({
  value: "mat",
  api: "ezdray/v1/ajax",
  results: [],
  isLoading: false,
  keyUp: function (e) {
    var component = this;
    var params = {
      value: component.get('value'),
      campaign: '6f9a86a0-5e2f-11e5-a83a-0bfa1ba31620'
    }
    component.pidevApi.get('http://byway.com/api/ezdray/v1/ajax', params,
      function(success) {
        Ember.Logger.info("success", success);
      },
      function(error) {
        Ember.Logger.info("error", error);
      },
      component.get('session.secure.token')
    );
  }
});
