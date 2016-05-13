import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  kind: DS.attr('person-kind'),
  status: DS.attr('person-status'),
  date: DS.attr('date-range'),
  location: DS.attr('string', {defaultValue:''}),
  website: DS.attr('string', {defaultValue:''}),
  facebook: DS.attr('string', {defaultValue:''}),
  twitter: DS.attr('string', {defaultValue:''}),
  email: DS.attr('string', {defaultValue:''}),
  phone: DS.attr('string', {defaultValue:''}),
  picture: DS.attr('string', {defaultValue:''}),
  description: DS.attr('string', {defaultValue:''}),
  id_name: DS.attr('string'),
  common_name: DS.attr('string'),
  full_name: DS.attr('string'),
  formal_name: DS.attr('string'),
  first_name: DS.attr('string'),
  last_name: DS.attr('string'),
  nick_name: DS.attr('string'),
  organization: DS.belongsTo('organization', {async: true}),
  chapter: DS.belongsTo('chapter', {async: true}),
  sessions_ca: DS.hasMany('session', {inverse: 'administrator', async: true}),
  certifications: DS.hasMany('certification', {async: true}),
  roles: DS.hasMany('role', {async: true}),
  panels: DS.hasMany('judge', {async: true}),
  conventions: DS.hasMany('convention', {inverse:'drcj', async: true}),
});
