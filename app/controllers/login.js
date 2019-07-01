import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

export default Controller.extend({
  session: service(),
  faq1: true,
  faq2: true,
  faq3: true,
  faq4: true,
  faq5: true,
  actions: {
    login () {
      const authOptions = {
        scope: 'openid profile email app_metadata user_metadata',
        responseType: 'token id_token',
      };
      this.session.authenticate(
        'authenticator:auth0-universal',
        authOptions
      );
    },
  }
});
