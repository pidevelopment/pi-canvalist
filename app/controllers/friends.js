import Ember from 'ember';

export default Ember.Controller.extend({

  queryParams: ['query'],
  query: null,

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
      this.store.unloadAll('friend');
      this.set('results', this.store.find('friend', {query: query}));
      Ember.Logger.info("updateQuery", query);
      this.set('query', query);
    },

    addFriend: function(friend) {
      var controller = this;
      controller.pidevApi.get('ezdray/v1/users/request/' + friend.id, {},
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
