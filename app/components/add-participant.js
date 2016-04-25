import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  actions: {
    saveParticipant() {
      const flashMessages = Ember.get(this, 'flashMessages');
      var participant = this.get('store').createRecord('participant', {
        convention: this.get('convention'),
        organization: this.get('organization'),
      });
      participant.save()
      .then(() => {
        this.set('organization', null);
        // flashMessages.success('Success');
      })
      .catch(() => {
        flashMessages.danger('Error');
      });
    },
  },
  allOrganizations: Ember.computed(function() {
    return this.get('store').findAll('organization');
  }),
  orgsSort: ['lft'],
  organizationChoices: Ember.computed.sort(
    'allOrganizations',
    'orgsSort'
  )
});
