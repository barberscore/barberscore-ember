import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  actions: {
    saveSubmission(status) {
      this.model.set('status', status);
      isCollapsed:      this.model.save()
      .then(() => {
        // this.get('flashMessages').success('Success');
      })
      .catch(() => {
        this.get('flashMessages').danger('Error');
      });
    },
  },
  submissionStatus: [
    'New',
    'Validated',
  ]
});
