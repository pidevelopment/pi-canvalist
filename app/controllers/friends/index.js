import Ember from 'ember';

export default Ember.Controller.extend({

  queryParams: ['query'],
  query: null,
  minValueLength: 4,

  results: [],

  filteredArticles: function() {
    var query = this.get('query');
    var friends = this.get('model');

    if (query) {
      return friends.filterBy('lname', query);
    } else {
      return friends;
    }
  }.property('query', 'model'),

  actions: {
    updateQuery: function(query) {
      Ember.Logger.info("updateQuery", query);
      var controller = this;
      this.set('results', []);
      this.set('query', query);
      if(query.length >= this.get('minValueLength')) {
        return this.pidevApi.get('userajax', {query: query},
          function(response) {
            // success
           Ember.Logger.info("success userajax resp", response);
           controller.set('results', response);
          },
          function(response) {
            // error
            Ember.Logger.info("error userajax resp", response);
          },
          this.get('session.secure.token')
        );
      }
    },

    addFriend: function(friend) {
      Ember.Logger.info("friend", friend);
      var controller = this;
      controller.pidevApi.get('ezdray/v1/users/request/' + friend.myid, {},
        function(response) {
          Ember.Logger.info("success", response);
          friend.set('hasBeenAdded', true);
        },
        function(response) {
          Ember.Logger.info("error", response);
        },
        controller.get('session.secure.token')
      );

    }
  }
});
