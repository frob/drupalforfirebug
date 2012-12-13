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
    Firebug.MyPanel.prototype = FBL.extend(Firebug.Panel, {
      name: panelName,
      title: "Drupal",
      buttons: Connection.buttons,
      
      initialize: function() {
          Firebug.Panel.initialize.apply(this, arguments);
          Firebug.registerModule(Connection);
          
          this.refresh();
          
          if (FBTrace.DBG_DRUPALFORFIREBUG) {
            FBTrace.sysout("DrupalForFirebug; MyPanel.initialize", this);
          }
      },
    
      destroy: function(state) {
        Firebug.unregisterModule(Connection);
        Firebug.Panel.destroy.apply(this, arguments);
        if (FBTrace.DBG_DRUPALFORFIREBUG) {
          FBTrace.sysout("DrupalForFirebug; MyPanel.destroy");
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
      
        if (FBTrace.DBG_DRUPALFORFIREBUG)
          FBTrace.sysout("DrupalForFirebug; MyPanel.show", this);
      },
        
      refresh: function() {
        // Render panel content. The HTML result of the template corresponds to: 
        // this.panelNode.innerHTML = "<span>" + Locale.$STR("hellobootamd.panel.label") + "</span>";
        // this.MyTemplate.render(this.panelNode);
        // filterCategory = Connection.currentButton;
        // var drupal_firebug_content = content.document.getElementById('drupalforfirebug_' + filterCategory).cloneNode(true);
        // hidden = drupal_firebug_content.getElementsByClassName("content");
        // for(var i = 0; i < hidden.length; i++) {
        //   hidden[i].removeAttribute("style");
        // }
        this.panelNode.innerHTML = Connection.panel;
        
        if (FBTrace.DBG_DRUPALFORFIREBUG) {
          FBTrace.sysout("DrupalForFirebug; MyPanel.refresh", context);
        }
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
    
    if (FBTrace.DBG_DRUPALFORFIREBUG) {
      FBTrace.sysout("DrupalForFirebug; DrupalPanel.js, stylesheet registered chrome://drupalforfirebug/skin/drupalforfirebug.css");
    }
  
  return Firebug.MyPanel;
});

