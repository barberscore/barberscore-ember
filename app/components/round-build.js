import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default Component.extend({
  currentUser: service(),
  store: service(),
  flashMessages: service(),
  buildRoundModal: false,
  buildRoundModalError: false,
  buildRound: task(function *() {
    try {
      let round = yield this.model.build({
        'by': this.get('currentUser.user.id')
      });
      this.model.reload();
      this.get('store').pushPayload('round', round);
      this.get('model.appearances').invoke('reload');
      this.get('model.panelists').invoke('reload');
      this.set('buildRoundModal', false);
      this.set('buildRoundModalError', false);
      this.get('flashMessages').success("Built!");
    } catch(e) {
      this.set('buildRoundModalError', true);
    }
  }).drop(),
});
