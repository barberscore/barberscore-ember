import Ember from 'ember';

export default Ember.Controller.extend({
  store: Ember.inject.service(),
  performanceSortProperties: ['num', 'performer.performerscore.total_score:desc',],
  sortedPerformances: Ember.computed.sort(
    'model.performances',
    'performanceSortProperties'
  ),
  isEditing: false,
  isRaw: false,
  isCollapsed: false,
  actions: {
    collapseHeader() {
      this.toggleProperty('isCollapsed');
    },
    sortBy(performanceSortProperties) {
      this.set('performanceSortProperties', [performanceSortProperties]);
    },
    editOrder() {
      this.set('isEditing', true);
    },
    saveOrder() {
      let children = this.get('model.performances');
      children.forEach(function(item) {
        item.save();
      });
      this.set('isEditing', false);
    },
    cancelOrder() {
      let children = this.get('model.performances');
      children.forEach(function(item) {
        item.rollbackAttributes();
      });
      this.set('isEditing', false);
    },
    reorderItems(itemModels) {
      itemModels.forEach(function(item, index) {
        item.set('num', index+1);
      });
    },
    saveDate(start, end) {
      this.model.set('start_date', start);
      this.model.set('end_date', end);
      this.model.save();
    },
    letsGo() {
      this.toggleProperty('isRaw');
    },
    deletePerformance(performance) {
      performance.destroyRecord();
    },
    drawRound() {
      isCollapsed:      this.model.draw()
      .then(() => {
        this.get('flashMessages').success('Success');
      })
      .catch(() => {
        this.get('flashMessages').danger('Error');
      });
      this.model.reload();
    },
    resortRound() {
      isCollapsed:      this.model.resort()
      .then(() => {
        this.get('flashMessages').success('Success');
      })
      .catch(() => {
        this.get('flashMessages').danger('Error');
      });
      this.model.reload();
    },
    startRound() {
      isCollapsed:      this.model.start()
      .then((response) => {
        this.store.pushPayload('round', response);
      })
      .catch(() => {
        this.get('flashMessages').danger('Error');
      });
    },
    finishRound() {
      isCollapsed:      this.model.finish()
      .then((response) => {
        this.store.pushPayload('round', response);
      })
      .catch(() => {
        this.get('flashMessages').danger('Error');
      });
    },
    publishRound() {
      isCollapsed:      this.model.publish()
      .then((response) => {
        this.store.pushPayload('round', response);
      })
      .catch(() => {
        this.get('flashMessages').danger('Error');
      });
    },
    moveTop(performance) {
      isCollapsed:      performance.move_top()
      .then(() => {
        this.get('flashMessages').success('Success');
      })
      .catch(() => {
        this.get('flashMessages').danger('Error');
      })
      .finally(()=>{
        this.get('model.performances').sortBy('performance.num');
      });
    },
    moveUp(performance) {
      isCollapsed:
      performance.move_up()
      .then(() => {
        this.get('flashMessages').success('Success');
        let reloaded =  this.get('model.performances').map( performance => performance.reload() );
        return Ember.RSVP.all(reloaded);
      })
      .catch(() => {
        this.get('flashMessages').danger('Error');
      });
    },
    moveDown(performance) {
      isCollapsed:      performance.move_down()
      .then(() => {
        this.get('flashMessages').success('Success');
      })
      .catch(() => {
        this.get('flashMessages').danger('Error');
      })
      .finally(()=>{
        this.get('model.performances').sortBy('performance.num');
      });
    },
    moveBottom(performance) {
      isCollapsed:      performance.move_bottom()
      .then(() => {
        this.get('flashMessages').success('Success');
      })
      .catch(() => {
        this.get('flashMessages').danger('Error');
      });
      performance.reload();
    },
    scratch(performance) {
      isCollapsed:      performance.scratch()
      .then(() => {
        this.get('flashMessages').success('Success');
      })
      .catch(() => {
        this.get('flashMessages').danger('Error');
      })
      .finally(()=>{
        this.get('model.performances').removeObject(performance);
      });
    },
  },
});
