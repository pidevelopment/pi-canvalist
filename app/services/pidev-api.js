import Ember from 'ember';

var apiURL = 'http://petitions.pidevelopment.org/api/';

export default Ember.Service.extend({

  get: function(route, params, successCallback, failureCallback, token) {
    params = typeof params !== 'undefined' ? params : [];
    token = typeof token !== 'undefined' ? token : null;
    return Ember.$.ajax({
      type: 'GET',
      url: apiURL + route,
      data: params,
      beforeSend: function(request) {
        request.setRequestHeader("Authorization", "Bearer " + token);
      }
    }).then(function(result) {
      // bug in api, sometimes it returns the JSON object stringified.  parse if needed.
      if (typeof result === 'string') { result = JSON.parse(result); }

      Ember.Logger.info('GET result: ', result, typeof result);
      if (result.status === 'Ok' || result.status === 'OK') {
        successCallback(result.data);
      } else {
        failureCallback(result);
      }
    });
  },

  post: function(route, params, successCallback, failureCallback) {
    Ember.$.ajax({
      type: 'POST',
      url: apiURL + route,
      contentType: "application/json",
      data: JSON.stringify(params)
    }).then(function (result) {
      Ember.Logger.info('POST result: ', result);
      if (result["status"] === 'Ok' || result["token_type"] === "Bearer") {
        successCallback(result);
      } else {
        failureCallback(result);
      }
    });
  },

  put: function(route, params, successCallback, failureCallback) {
    Ember.$.ajax({
      type: 'PUT',
      url: apiURL + route,
      contentType: "application/json",
      data: JSON.stringify(params)
    }).then(function (result) {
      Ember.Logger.info('PUT result: ', result);
      if (result.status === 'Ok' || result.status === 'OK') {
        successCallback(result);
      } else {
        failureCallback(result);
      }
    });
  },

  delete: function(route, params, successCallback, failureCallback) {
    Ember.$.ajax({
      type: 'DELETE',
      url: apiURL + route,
      contentType: "application/json",
      data: JSON.stringify(params)
    }).then(function (result) {
      Ember.Logger.info('DELETE result: ', result);
      if (result.status === 'Ok' || result.status === 'OK') {
        successCallback(result);
      } else {
        failureCallback(result);
      }
    });
  },

  getFake: function(route) {
    return Ember.$.ajax({
      type: 'GET',
      url: 'api/v1/' + route,
    }).then(function(result) {
      Ember.Logger.info('GET fake result: ', result);
      return result;
    });
  }

});
