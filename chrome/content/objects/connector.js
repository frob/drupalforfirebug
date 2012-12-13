define([
    "firebug/lib/object",
    "firebug/lib/trace",
],
function(Obj, FBTrace) {
  var DFFapi = "legacy";

  var drupalButtons = [];
  drupalButtons.push({
    label: "General",
    tooltiptext: "Tool Tip",
    hook: "general"
  }, {
    label:"SQL",
    tooltiptext: "Tool Tip",
    hook: "sql"
  }, {
    label:"Forms",
    tooltiptext: "Tool Tip",
    hook: "hook_form_alter"
  }, {
    label:"Users",
    tooltiptext: "Tool Tip",
    hook: "hook_nodeapi"
  }, {
    label:"Nodes",
    tooltiptext: "Tool Tip",
    hook: "hook_nodeapi"
  }, {
    label:"Views",
    tooltiptext: "Tool Tip",
    hook: "hook_views"
  }, {
    label:"Execute PHP",
    tooltiptext: "Tool Tip",
    hook: "php"
  });
  
Firebug.Connection = Obj.extend(Firebug.Module, {
  buttons: drupalButtons,
  api: DFFapi,
  currentButton: "general",
  
  initialize: function(owner) {
    Firebug.Module.initialize.apply(this, arguments);
    
    this.api = Components.classes["@mozilla.org/preferences-service;1"]
      .getService(Components.interfaces.nsIPrefService)
      .getBranch("extensions.drupalforfirebug.");

    this.api.QueryInterface(Components.interfaces.nsIPrefBranch2);
    this.api.addObserver("", this, false);

    this.api = this.prefs.getCharPref("API").toUpperCase();

    this.panels = ['Stuff'];
    
    if (FBTrace.DBG_DRUPALFORFIREBUG) {
      FBTrace.sysout("DrupalForFirebug; DrupalConnection.initialize", this);
    }
  },

  shutdown: function() {
    Firebug.Module.shutdown.apply(this, arguments);
    this.api.removeObserver("", this);

    for (var i=0; i<this.buttons.length; i++) {
      Firebug.chrome.removeToolbarButton(this.buttons[i]);
    }

    if (FBTrace.DBG_DRUPALFORFIREBUG) {
      FBTrace.sysout("DrupalForFirebug; Connection.shutdown");
    }
        
  },

  onButton: function(hook, panel) {
    this.currentButton = hook;
    panel.refresh();
    
    if (FBTrace.DBG_DRUPALFORFIREBUG) {
      FBTrace.sysout("DrupalForFirebug; onButton", this);
    }
  }

});

return Firebug.Connection;
});