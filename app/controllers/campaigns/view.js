import Ember from 'ember';

export default Ember.Controller.extend({

  queryParams: ['query'],
  query: null,
  minValueLength: 2,
  maxValueLength: 4,
  isLoading: false,
  results: [],

  actions: {
    updateQuery: function(query) {
      var controller = this;
      Ember.Logger.info("updateQuery", query);
      if(query.length <= 4) {
        controller.store.unloadAll('voter');
        controller.set('isLoading', true);
        controller.store.find('voter', {"query": query, "campaign": "8fb3f1c0-6090-11e5-870e-0bfa1ba31620"}).then(function(voters) {
          controller.set('results', voters);
          controller.set('isLoading', false);
        }, function(error) {
           controller.set('results', []);
           controller.set('isLoading', false);
        });
      }
    },

    markAsSigned: function(voter) {
      var campaignID = this.get('model.id');
      var voterID = voter.id;
      return this.pidevApi.get('campaigns/marksigned/' + campaignID + '/' + voterID, {},
        function(response) {
         Ember.Logger.info("voter marked as signed", response);
         voter.set('sign_status', 'Signed');
        },
        function(response) {
          Ember.Logger.error("voter marked as signed error", response);
        },
        this.get('session.secure.token')
      );
    },

    markAsUnsigned: function(voter) {
      var campaignID = this.get('model.id');
      var voterID = voter.id;
      return this.pidevApi.get('campaigns/marknotsigned/' + campaignID + '/' + voterID, {},
        function(response) {
         Ember.Logger.info("voter marked as NOT signed", response);
         voter.set('sign_status', 'Not Signed');
        },
        function(response) {
          Ember.Logger.error("voter marked as NOT signed error", response);
        },
        this.get('session.secure.token')
      );

    }

  }
});
