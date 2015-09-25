import Ember from 'ember';

export default Ember.Controller.extend({

  queryParams: ['query', 'search'],
  search: "",
  query: null,
  minValueLength: 2,
  maxValueLength: 4,
  isLoading: false,
  results: [],

  sortedResults: Ember.computed('search', function() {
    // get needed variables
    var search = this.get('search');
    var controller = this;

    // only hit api if search is 4 or less
    // TODO: if search is greater than 4, filter what we have
    if(search.length <= 4) {

      // search params for API
      var params = { query: search, campaign: controller.get('model.id') };

      // start fresh
      controller.store.unloadAll('voter');

      // ember data will get us some voters
      return controller.store.find('voter', params);
    }
  }),

  actions: {

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
