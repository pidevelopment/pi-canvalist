import Ember from 'ember';
import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
  pathForType: function() {
    return "ezdray/v1/users";
  },
  buildURL: function(modelName, id, snapshot, requestType, query) {
    Ember.Logger.info("buildURL", modelName, id, snapshot, requestType, query);
    if(requestType === "findAll") {
      return "http://petitions.pidevelopment.org/api/ezdray/v1/users/friends";
    }
    if(requestType === "query") {
      return "http://petitions.pidevelopment.org/api/userajax";
    }
    return "http://petitions.pidevelopment.org/api/ezdray/v1/users/" + id;
  }
});
