import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default Component.extend({
  router: service(),
  currentUser: service(),
  store: service(),
  flashMessages: service(),
  buildSessionModal: false,
  buildSessionModalError: false,
  buildSession: task(function *() {
    try {
      yield this.model.build({
        'by': this.get('currentUser.user.id')
      });
      this.model.reload();
      this.set('buildSessionModal', false);
      this.set('buildSessionModalError', false);
      this.flashMessages.success("Built!");
      this.router.transitionTo('dashboard.conventions.convention.sessions.session.contests');
    } catch(e) {
      this.set('buildSessionModalError', true);
    }
  }).drop(),
});
