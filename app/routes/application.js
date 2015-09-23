import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
  model: function() {
    Ember.Logger.info("user info", this.get('session.secure.user'));
    return this.get('session.secure.user');
  },
	actions: {
		login: function() {
			this.get('session').authenticate('authenticator:application', 'google-api', {});
		},

    acceptRequest: function(request) {
      Ember.Logger.info("accepting request", request);
    },

    denyRequest: function(request) {
      Ember.Logger.info("denying request", request);
      this.pidevApi.get('ezdray/v1/users/deny/' + request.myid, {},
        function(response) {
          // success
          Ember.Logger.info("successfully denied user", response);
        },
        function(response) {
          // error
          Ember.Logger.info("failed to deny user", response);
        },
        this.get('session.secure.token')
      );
    }

	}
});
