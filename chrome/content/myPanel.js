/* See license.txt for terms of usage */

define([
    "firebug/lib/lib",
    "firebug/lib/object",
    "firebug/lib/trace",
    "firebug/lib/locale",
    "firebug/lib/domplate"
],
function(FBL, Obj, FBTrace, Locale, Domplate) {
  
  var panelName = "drupalforfirebug";
  var dffContent = new Connector('legacy');
  
  Firebug.MyPanel = function MyPanel() {};
  Firebug.MyPanel.prototype = FBL.extend(Firebug.Panel,
  {
      name: panelName,
      title: "Drupal",
  
      // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //
      // Initialization
  
      initialize: function()
      {
          Firebug.Panel.initialize.apply(this, arguments);
  
          if (FBTrace.DBG_DRUPALFORFIREBUG)
              FBTrace.sysout("DrupalForFirebug; MyPanel.initialize");
  
          // TODO: Panel initialization (there is one panel instance per browser tab)
  
          this.refresh();
      },
  
      destroy: function(state)
      {
          if (FBTrace.DBG_DRUPALFORFIREBUG)
              FBTrace.sysout("DrupalForFirebug; MyPanel.destroy");
  
          Firebug.Panel.destroy.apply(this, arguments);
      },
  
      /**
       * Extends toolbar for this panel.
       */
      getPanelToolbarButtons: function()
      {
          var buttons = [];
  
          buttons.push({
              label: "toolbar.button.label",
              tooltiptext: "toolbar.button.tooltip",
              command: FBL.bindFixed(this.onHello, this)
          });
          
          buttons.push({
              label: "toolbar.button.label2",
              tooltiptext: "toolbar.button.tooltip2",
              command: FBL.bindFixed(this.onHello, this)
          });
          
  
          return buttons;
      },
  
      show: function(state)
      {
          Firebug.Panel.show.apply(this, arguments);
  
          if (FBTrace.DBG_DRUPALFORFIREBUG)
              FBTrace.sysout("DrupalForFirebug; MyPanel.show");
      },
  
      refresh: function()
      {
          // Render panel content. The HTML result of the template corresponds to: 
          //this.panelNode.innerHTML = "<span>" + Locale.$STR("hellobootamd.panel.label") + "</span>";
          this.MyTemplate.render(this.panelNode);
  
          // TODO: Render panel content
      },
  
      // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //
      // Commands
  
      onHello: function()
      {
          alert(FBL.$STR("toolbar.msg.hello2"));
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

