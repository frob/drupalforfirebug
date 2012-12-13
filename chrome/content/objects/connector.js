define([
    "firebug/lib/object",
    "firebug/lib/trace",
    "firebug/lib/locale",
    "firebug/lib/domplate"
],
  function(Obj, FBTrace, Locale, Domplate) {
    Firebug.registerStringBundle("chrome://drupalforfirebug/locale/drupalforfirebug.properties");
    var DFFapi = "legacy";
    var error = Locale.$STR("drupalforfirebug.panel.error")
    var drupalSite = content.document.getElementById('drupalforfirebug_general');
    var defaultContent = error;
    if(drupalSite) {
      defaultContent = drupalSite.innerHTML;
    }
  
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
    panel: defaultContent,
    
    initialize: function(owner) {
      Firebug.Module.initialize.apply(this, arguments);
      Firebug.registerStringBundle("chrome://drupalforfirebug/locale/drupalforfirebug.properties");
      
      this.api = Components.classes["@mozilla.org/preferences-service;1"]
        .getService(Components.interfaces.nsIPrefService)
        .getBranch("extensions.drupalforfirebug.");
  
      this.api.QueryInterface(Components.interfaces.nsIPrefBranch2);
      this.api.addObserver("", this, false);
  
      this.api = this.api.getCharPref("API").toUpperCase();
  
      this.MyTemplate.render(this.panel);;
      
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
      var drupalFirebugContent = content.document.getElementById('drupalforfirebug_' + filterCategory).cloneNode(true);
      hidden = drupalFirebugContent.getElementsByClassName("content");
      // remove the style="hidded" from the .content elements.
      for(var i = 0; i < hidden.length; i++) {
        hidden[i].removeAttribute("style");
      }
      if(drupalFirebugContent) {
        this.panel = drupalFirebugContent.innerHTML;
      }
      else {
        this.panel = error;
      }
    },
  
    onButton: function(hook, panel) {
      this.currentButton = hook;
      this.changePanel(hook);
      panel.refresh();
    }
  
  });
  
  // ********************************************************************** //
  // Panel UI (Domplate)
  
  // Register locales before the following template definition.
  Firebug.registerStringBundle("chrome://drupalforfirebug/locale/drupalforfirebug.properties");
  
  /**
   * Domplate template used to render panel's content. Note that the template uses
   * localized strings and so, Firebug.registerStringBundle for the appropriate
   * locale file must be already executed at this moment.
   */
  with (Domplate) {
  Firebug.Connection.MyTemplate = domplate( {
    tag:
      DIV(
        SPAN(
          Locale.$STR("drupalforfirebug.panel.error")
        )
      ),

    render: function(parentNode) {
      this.tag.replace({}, parentNode);
    }
  })}

  return Firebug.Connection;
});