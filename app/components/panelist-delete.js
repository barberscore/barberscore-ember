import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default Component.extend({
  router: service(),
  store: service(),
  flashMessages: service(),
  deletePanelistModal: false,
  deletePanelistModalError: false,
  deletePanelist: task(function *() {
    try {
      yield this.model.destroyRecord({
        'by': this.get('currentUser.user.id'),
      });
      this.set('deletePanelistModal', false);
      this.set('deletePanelistModalError', false);
      this.flashMessages.success("Deleted!");
      this.router.transitionTo('dashboard.conventions.convention.sessions.session.rounds.round.panelists');
    } catch(e) {
      this.set('deletePanelistModalError', true);
    }
  }).drop(),
});
