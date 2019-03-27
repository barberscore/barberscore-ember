import Component from '@ember/component';
import { task } from 'ember-concurrency';
import FileSaverMixin from 'ember-cli-file-saver/mixins/file-saver';

export default Component.extend(FileSaverMixin,{
  csa: task(function *() {
    let competitor = yield this.model;
    let pdf = yield competitor.csa();
    this.saveFileAs('csa.pdf', pdf, 'application/pdf');
  }).drop(),
});