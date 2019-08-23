import { not } from '@ember/object/computed';
import DS from 'ember-data';

export default DS.Model.extend({
  status: DS.attr('user-status'),
  name: DS.attr('string'),
  email: DS.attr('string'),
  isActive: DS.attr('boolean'),
  isStaff: DS.attr('boolean'),
  roles: DS.hasMany('role', {async: true}),
  permissions: DS.attr(),

  isDisabled: not(
    'permissions.write'
  ),
});
