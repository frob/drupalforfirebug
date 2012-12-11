define([
    "firebug/lib/object",
    "firebug/lib/trace",
],
function(Obj, FBTrace) {
Firebug.Connection = Obj.extend(Firebug.Module, {
  buttons: [],
  panels: [],
  
  initialize: function(owner)
  {
    Firebug.Module.initialize.apply(this, arguments);
    if (FBTrace.DBG_DRUPALFORFIREBUG) {
      FBTrace.sysout("DrupalForFirebug; DrupalConnection.initialize", this);
    }
    
    this.buttons = ["General", "SQL", "Forms", "Users", "Users", "Nodes", "Views", "Execute PHP"];
    this.panels = ['Stuff'];
  },

  shutdown: function()
  {
    Firebug.Module.shutdown.apply(this, arguments);

    for (var i=0; i<this.buttons.length; i++) {
      Firebug.chrome.removeToolbarButton(this.buttons[i]);
    }

    if (FBTrace.DBG_DRUPALFORFIREBUG) {
      FBTrace.sysout("DrupalForFirebug; Connection.shutdown");
    }
        
  }

});

return Firebug.Connection;
});