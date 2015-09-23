import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
  pathForType: function(modelName) {
    Ember.Logger.info("setting path for type?");
    return "userajax";
  }
});
