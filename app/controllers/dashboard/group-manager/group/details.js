import Ember from 'ember';
// import { task, timeout } from 'ember-concurrency';

export default Ember.Controller.extend({
  store: Ember.inject.service(),
  currentUser: Ember.inject.service(),
  flashMessages: Ember.inject.service(),
  isEditing: false,
  isDisabled: Ember.computed.not('isEditing'),
  location: '',
  entityCall: Ember.computed(function() {
    return this.get('store').query('entity', {
      'kind__lt': 20, //TODO Hardcoded
      'page_size': 100,
    });
  }),
  entityOptionsProperties: [
    'kindSort:asc',
    'name:asc',
  ],
  entityOptions: Ember.computed.sort(
    'entityCall',
    'entityOptionsProperties'
  ),
  representingCall: Ember.computed(function() {
    return this.get('store').query('entity', {
        'kind__lt': '30',
        'page_size': 100,
      });
    // }).then((data) => {
    //   sessions.addObjects(data);
    // });
    // return sessions;
  }),
  // representingFilter: Ember.computed.filterBy(
  //   'representingCall',
  //   'kind',
  //   'Group'
  // ),
  representingSortProperties: [
    'kindSort:asc',
    'name:asc',
  ],
  representingOptions: Ember.computed.sort(
    'representingCall',
    'representingSortProperties'
  ),
  representing: Ember.computed(
    'model.representing',
    function() {
      return this.get('model.representing');
    }
  ),
  actions: {
    editGroup() {
      this.set('isEditing', true);
    },
    cancelGroup() {
      this.model.rollbackAttributes();
      this.set('isEditing', false);
    },
    deleteGroup() {
      this.model.destroyRecord()
      .then(() => {
        this.get('flashMessages').warning('Deleted');
        this.set('isEditing', false);
        this.transitionToRoute('dashboard.group-manager');
      });
    },
    saveGroup() {
      this.model.save()
      .then(() => {
        this.set('isEditing', false);
        this.get('flashMessages').success('Saved');
      })
      .catch((error) => {
          if (error.errors[0].status === "403") {
            this.get('flashMessages').danger("You don't have permission to make changes.  Please contact support.");
          }
      });
    },
  }
});