import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  flashMessage: Ember.get(this, 'flashMessages'),
  actions: {
    saveAssignment() {
var assignment = this.get('store').createRecord('assignment', {
        session: this.get('model'),
        judge: this.get('judge'),
        kind: "Official",
        category: this.get('judge.category'),
      });
      assignment.save()
      .then(() => {
        this.set('judge', null);
        this.get('flashMessages').success("Saved");
      })
      .catch((error) => {
        assignment.deleteRecord();
        console.log(error);
        this.get('flashMessages').danger("Error");
      });
    },
    searchAssignment(term) {
      return new Ember.RSVP.Promise((resolve, reject) => {
        Ember.run.debounce(this, this._performSearch, term, resolve, reject, 600);
      });
    },
  },
  assignmentKind: [
    'Official',
    'Practice',
  ],
  assignmentCategory: [
    'Admin',
    'Music',
    'Presentation',
    'Singing',
  ],
  _performSearch(term, resolve, reject) {
    if (Ember.isBlank(term)) { return resolve([]); }
    this.get('store').query('judge', {'nomen__icontains': term})
      .then(data => resolve(data), reject);
  }
});