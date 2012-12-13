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
    hook: "hook_user"
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
      FBTrace.sysout("DrupalForFirebug; DrupalConnection.shutdown");
    }
        
  },

  changePanel: function(hook) {
    filterCategory = this.currentButton;
    
    // get the currently requested content
    var drupal_firebug_content = content.document.getElementById('drupalforfirebug_' + filterCategory).cloneNode(true);
    hidden = drupal_firebug_content.getElementsByClassName("content");
    // remove the style="hidded" from the .content elements.
    for(var i = 0; i < hidden.length; i++) {
      hidden[i].removeAttribute("style");
    }
    
    this.panel = drupal_firebug_content.innerHTML;
  },

  onButton: function(hook, panel) {
    this.currentButton = hook;
    this.changePanel(hook);
    panel.refresh();
  }

});

return Firebug.Connection;
});