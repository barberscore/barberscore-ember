import Inflector from 'ember-inflector';

export function initialize(/* application */) {
  const inflector = Inflector.inflector;
  inflector.uncountable('appearance');
  inflector.uncountable('assignment');
  inflector.uncountable('award');
  inflector.uncountable('chart');
  inflector.uncountable('contest');
  inflector.uncountable('convention');
  inflector.uncountable('entry');
  inflector.uncountable('group');
  inflector.uncountable('outcome');
  inflector.uncountable('panelist');
  inflector.uncountable('person');
  inflector.uncountable('repertory');
  inflector.uncountable('role');
  inflector.uncountable('round');
  inflector.uncountable('score');
  inflector.uncountable('session');
  inflector.uncountable('song');
  inflector.uncountable('statelog');
  inflector.uncountable('user');
}

export default {
  name: 'inflector',
  initialize
};
