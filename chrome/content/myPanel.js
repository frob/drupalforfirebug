/* See license.txt for terms of usage */

define([
    "firebug/lib/lib",
    "firebug/lib/object",
    "firebug/lib/trace",
    "firebug/lib/locale",
    "firebug/lib/domplate",
    "drupalforfirebug/objects/connector"
],
function(FBL, Obj, FBTrace, Locale, Domplate, Connection) {
  
  var panelName = "drupalforfirebug";
  
  Firebug.MyPanel = function MyPanel() {};
  Firebug.MyPanel.prototype = FBL.extend(Firebug.Panel,
  {
    name: panelName,
    title: "Drupal",
    buttons: Connection.buttons,
    
    initialize: function() {
        Firebug.Panel.initialize.apply(this, arguments);
        Firebug.registerModule(Connection);
  
        if (FBTrace.DBG_DRUPALFORFIREBUG)
          FBTrace.sysout("DrupalForFirebug; MyPanel.initialize", this);
  
        this.refresh();
    },
  
    destroy: function(state) {
      if (FBTrace.DBG_DRUPALFORFIREBUG)
        FBTrace.sysout("DrupalForFirebug; MyPanel.destroy");
  
      Firebug.unregisterModule(Connection);
      Firebug.Panel.destroy.apply(this, arguments);
    },
  
      /**
       * Extends toolbar for this panel.
       */
    getPanelToolbarButtons: function() {
      var buttons = this.buttons;
      
      for (var i=0; i<this.buttons.length; i++) {
        hook = this.buttons[i].hook;
        this.buttons[i].command =  FBL.bindFixed(Connection.onButton, Connection, hook, this);
      }
      
      FBTrace.sysout("DrupalForFirebug; MyPanel.buttons", FBL);
      return buttons;
    },
  
    show: function(state) {
      Firebug.Panel.show.apply(this, arguments);
    
      if (FBTrace.DBG_DRUPALFORFIREBUG)
        FBTrace.sysout("DrupalForFirebug; MyPanel.show");
    },
      
    refresh: function() {
      // Render panel content. The HTML result of the template corresponds to: 
      //this.panelNode.innerHTML = "<span>" + Locale.$STR("hellobootamd.panel.label") + "</span>";
      //this.MyTemplate.render(this.panelNode);
      filterCategory = Connection.currentButton;
      var drupal_firebug_content = content.document.getElementById('drupalforfirebug_' + filterCategory).innerHTML;
      this.panelNode.innerHTML = drupal_firebug_content;
      
    }
  
  });
  
  // ********************************************************************************************* //
  // Panel UI (Domplate)
  
  // Register locales before the following template definition.
  Firebug.registerStringBundle("chrome://drupalforfirebug/locale/drupalforfirebug.properties");
  
  /**
   * Domplate template used to render panel's content. Note that the template uses
   * localized strings and so, Firebug.registerStringBundle for the appropriate
   * locale file must be already executed at this moment.
   */
  with (Domplate) {
  Firebug.MyPanel.prototype.MyTemplate = domplate(
  {
      tag:
          SPAN(
              Locale.$STR("drupalforfirebug.panel.error")
          ),
  
      render: function(parentNode)
      {
          this.tag.replace({}, parentNode);
      }
  })}
  
  // ********************************************************************************************* //
  // Registration
  
  Firebug.registerStylesheet("chrome://drupalforfirebug/skin/drupalforfirebug.css");
  
  if (FBTrace.DBG_DRUPALFORFIREBUG)
      FBTrace.sysout("DrupalForFirebug; myPanel.js, stylesheet registered");
  
  return Firebug.MyPanel;
  
  // ********************************************************************************************* //
});

