import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    var map = {
      32: 'Chorus',
      41: 'Quartet',
    };
    return map[serialized];
  },

  serialize: function(deserialized) {
    var map = {
      'Chorus': 32,
      'Quartet': 41,
    };
    return map[deserialized];
  }
});
import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    var map = {
      32: 'Chorus',
      41: 'Quartet',
    };
    return map[serialized];
  },

  serialize: function(deserialized) {
    var map = {
      'Chorus': 32,
      'Quartet': 41,
    };
    return map[deserialized];
  }
});
