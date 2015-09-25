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

      // setup
      var controller = this;
      var params = {"query": query, "campaign": this.get('model.id')};

      // only hit api if query length is 4 or less
      // TODO: if query length is greater than 4,
      //       filter the data we have by "lastname" value
      if(query.length <= 4) {

        // start fresh
        controller.store.unloadAll('voter');

        // make the spinny thing happen
        controller.set('isLoading', true);

        // ember data will get us some voters
        controller.store.find('voter', params).then(function(voters) {
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
