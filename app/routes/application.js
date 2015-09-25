import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
  model: function() {
    // Ember.Logger.info("user info", this.get('session.secure.user'));
    // return this.get('session.secure.user');
    var route = this;
    this.pidevApi.get('ezdray/v1/users/me', {},
      function(response) {
        // success
        Ember.Logger.info("successfully get user info", response[0]);
        route.set('session.secure.user', response[0]);
        return response[0];
      },
      function(response) {
        // error
        Ember.Logger.info("failed to get user info", response);
      },
      this.get('session.secure.token')
    );
  },
	actions: {
		login: function() {
			this.get('session').authenticate('authenticator:application', 'google-api', {});
		},

    acceptRequest: function(request) {
      Ember.Logger.info("accepting request", request);
      // var user = this.get('session.secure.user');
      var route = this;
      this.pidevApi.get('ezdray/v1/users/confirm/' + request.myid, {},
        function(response) {
          // success
          Ember.Logger.info("successfully accepted user", response);
          route.refresh();
        },
        function(response) {
          // error
          Ember.Logger.info("failed to accept user", response);
        },
        this.get('session.secure.token')
      );
      return false;
    },

    denyRequest: function(request) {
      Ember.Logger.info("denying request", request);
      // var user = this.get('session.secure.user');
      var route = this;
      this.pidevApi.get('ezdray/v1/users/deny/' + request.myid, {},
        function(response) {
          // success
          Ember.Logger.info("successfully denied user", response);
          route.refresh();
        },
        function(response) {
          // error
          Ember.Logger.info("failed to deny user", response);
        },
        this.get('session.secure.token')
      );
      return false;
    }

	}
});
