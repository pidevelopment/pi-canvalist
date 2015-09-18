export function initialize(container, application) {
  application.inject('route', 'pidevApi', 'service:pidevApi');
  // application.inject('controller', 'pidevApi', 'service:pidevApi');
}

export default {
  name: 'pidev-api',
  initialize: initialize
};
