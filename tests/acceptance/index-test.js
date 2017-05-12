import { test } from 'qunit';
import moduleForAcceptance from 'barberscore-web/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | index');

test('visiting /index', function(assert) {
  visit('/index');

  andThen(function() {
    assert.equal(currentURL(), '/index');
  });
});
