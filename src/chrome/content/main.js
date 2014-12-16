define([
  "firebug/lib/trace",
  "DrupalForFirebug/DrupalPanel",
  "DrupalForFirebug/myListener",
  "DrupalForFirebug/myModule"
],
  // Currently only FBTrace and DrupalPanel are in use.
  function(FBTrace, DrupalPanel, MyListener, MyModule) {
  // ********************************************************************************************* //
  // Documentation
  
  // Firebug coding style: http://getfirebug.com/wiki/index.php/Coding_Style
  // Now using 
  // Drupal coding standards : http://drupal.org/coding-standards and http://drupal.org/node/172169
  // Firebug tracing: http://getfirebug.com/wiki/index.php/FBTrace
  
  // ********************************************************************************************* //
  // The application/extension object
  
  var theApp = { 
    initialize: function() {
      
      Firebug.registerStylesheet("chrome://drupalforfirebug/skin/drupalforfirebug.css");
      Firebug.registerStringBundle("chrome://drupalforfirebug/locale/drupalforfirebug.properties");
      // Firebug.registerModule(MyModule);
      // Firebug.registerUIListener(MyListener);
      Firebug.registerPanel(DrupalPanel);
      
      if (FBTrace.DBG_DRUPALFORFIREBUG) {
        FBTrace.sysout("DrupalForFirebug; Drupal for Firebug extension initialize");
      }
    },

    shutdown: function() {
      if (FBTrace.DBG_DRUPALFORFIREBUG) {
        FBTrace.sysout("DrupalForFirebug; Drupal for Firbug extension shutdown");
      }
              
      // Unregister all registered Firebug components
      // Firebug.unregisterModule(Firebug.MyModule);
      // Firebug.unregisterUIListener(MyListener);
      Firebug.unregisterPanel(Firebug.DrupalPanel);
      Firebug.unregisterStylesheet("chrome://drupalforfirebug/skin/drupalforfirebug.css");
      Firebug.unregisterStringBundle("chrome://drupalforfirebug/locale/drupalforfirebug.properties");

      }
  }
  return theApp;
});
