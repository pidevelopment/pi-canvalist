import Ember from 'ember';

export default Ember.Controller.extend({

  queryParams: ['search'],
  search: "",
  isLoading: false,

  sortedResults: Ember.computed('search', function() {

    // search params for API
    // only sending first 4 chars to the API bc Vince said so ¯\_(ツ)_/¯
    var params = {
      query: this.get('search').substring(0,4),
      campaign: this.get('model.id')
    };

    // start fresh
    this.store.unloadAll('voter');

    // ember data will get us some voters
    return this.store.find('voter', params);
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
