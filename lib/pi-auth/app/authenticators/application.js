import Ember from 'ember';
import ToriiAuthenticator from 'simple-auth-torii/authenticators/torii';
import { request } from 'ic-ajax';

export default ToriiAuthenticator.extend({
  providers: {

    'google-api': function(authResponse) {
      // return authorization code to pi-api to get token
      var accessToken;
      return request('http://petitions.pidevelopment.org/api/gplushandler', {
        data: authResponse.code,
        type: 'POST',
        contentType: 'application/octet-stream; charset=utf-8',
        processData: false
      }).then(function(response) {
        Ember.Logger.info("login response", response);
        // use token to get user info from google api
        accessToken = response.access_token;
        return request('http://petitions.pidevelopment.org/api/ezdray/v1/users/me', {
          beforeSend: function(request) {
            request.setRequestHeader("Authorization", 'Bearer ' + accessToken);
          }
        }).then(function(resp) {
          // save the token at session.secure.user and .token
          var user = resp.data[0]
          user.id = user.myid;
          Ember.Logger.info("user!", user);
          return { user: user, token: accessToken };
        });
      });
    }

  },

  authenticate: function(provider, options) {
    return this.torii.open(provider, options).then((authResponse) => {
      return this.get('providers')[provider](authResponse);
    });
  },

  restore: function(data) {
    return Ember.RSVP.resolve(data);
  },

  invalidate: function(data) {
    console.log('logging out', data);
    return new Promise(function(resolve, reject) {
      resolve();
      reject();
    });

    /*
     * the code below invalidates the app with google via the server
     */

    // return request('http://petitions.pidevelopment.org/api/gplushandler', {
    //   type: 'DELETE',
    //   beforeSend: function(req) {
    //     req.setRequestHeader("Authorization", "Bearer " + data.token);
    //   }
    // });
  }
});
