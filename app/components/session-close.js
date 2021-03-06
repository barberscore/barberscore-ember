import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default Component.extend({
  router: service(),
  currentUser: service(),
  store: service(),
  flashMessages: service(),
  closeSessionModal: false,
  closeSessionModalError: false,
  closeSession: task(function *() {
    try {
      let session = yield this.model.close({
        'by': this.get('currentUser.user.id')
      });
      yield this.store.pushPayload('session', session);
      this.set('closeSessionModal', false);
      this.set('closeSessionModalError', false);
      this.flashMessages.success("Closed!");
      this.router.transitionTo('dashboard.conventions.convention.sessions.session.draw');
    } catch(e) {
      this.set('closeSessionModalError', true);
    }
  }).drop(),
});
