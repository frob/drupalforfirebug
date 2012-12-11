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
    if (FBTrace.DBG_DRUPALFORFIREBUG) {
      FBTrace.sysout("DrupalForFirebug; DrupalConnection.initialize", this);
    }
    
    this.panels = ['Stuff'];
  },

  shutdown: function() {
    Firebug.Module.shutdown.apply(this, arguments);

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
    FBTrace.sysout("DrupalForFirebug; onButton", this);
  }

});

return Firebug.Connection;
});