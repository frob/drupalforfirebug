define([
    "firebug/lib/lib",
    "firebug/lib/object",
    "firebug/lib/trace",
    "firebug/lib/locale",
    "drupalforfirebug/objects/connector"
],
  function(FBL, Obj, FBTrace, Locale, Connection) {
    Firebug.registerStringBundle("chrome://drupalforfirebug/locale/drupalforfirebug.properties");
    var panelName = "drupalforfirebug";
    var title = Locale.$STR("drupalforfirebug.toolbar.button.label")
    
    Firebug.DrupalPanel = function DrupalPanel() {};
    Firebug.DrupalPanel.prototype = FBL.extend(Firebug.Panel, {
      name: panelName,
      title: title,
      buttons: Connection.buttons,
      
      initialize: function() {
          Firebug.Panel.initialize.apply(this, arguments);
          Firebug.registerModule(Connection);
          
          this.panelNode.innerHTML = Connection.panel;
          
          if (FBTrace.DBG_DRUPALFORFIREBUG) {
            FBTrace.sysout("DrupalForFirebug; DrupalPanel.initialize", this);
          }
      },
    
      destroy: function(state) {
        Firebug.unregisterModule(Connection);
        Firebug.Panel.destroy.apply(this, arguments);
        if (FBTrace.DBG_DRUPALFORFIREBUG) {
          FBTrace.sysout("DrupalForFirebug; DrupalPanel.destroy");
        }
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
        
        return buttons;
      },
    
      show: function(state) {
        Firebug.Panel.show.apply(this, arguments);
      
        if (FBTrace.DBG_DRUPALFORFIREBUG) {
          FBTrace.sysout("DrupalForFirebug; DrupalPanel.show", state);
        }
      },
        
      refresh: function() {
        // Render panel content. The HTML result of the template corresponds to: 
        // this.panelNode.innerHTML = "<span>" + Locale.$STR("hellobootamd.panel.label") + "</span>";
        // this.MyTemplate.render(this.panelNode);
        this.panelNode.innerHTML = Connection.panel;
        
        if (FBTrace.DBG_DRUPALFORFIREBUG) {
          FBTrace.sysout("DrupalForFirebug; DrupalPanel.refresh", context);
        }
      }
    });
  
  return Firebug.DrupalPanel;
});

