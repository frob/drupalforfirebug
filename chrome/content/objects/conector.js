define([
    "drupalforfirebug/objects/conectors/legacy"
],

function(Legacy) {

Connector = {
  // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //
  // Attributes

  name: panelName,
  title: "Drupal",

  // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //
  // Initialization

  initialize: function() {
    if (FBTrace.DBG_DRUPALFORFIREBUG)
      FBTrace.sysout("DrupalForFirebug; Connector.initialize");
      
  },

  destroy: function(state) {
    if (FBTrace.DBG_DRUPALFORFIREBUG)
      FBTrace.sysout("DrupalForFirebug; Connector.destroy");
  },

    
};

return Connector;
});
