/* See license.txt for terms of usage */

define([
    "firebug/lib/trace",
    "drupalforfirebug/myPanel",
    "drupalforfirebug/myModule",
    "drupalforfirebug/myListener"
],
function(FBTrace, MyPanel, MyModule, MyListener) {

// ********************************************************************************************* //
// Documentation

// Firebug coding style: http://getfirebug.com/wiki/index.php/Coding_Style
// Firebug tracing: http://getfirebug.com/wiki/index.php/FBTrace

// ********************************************************************************************* //
// The application/extension object

var theApp =
{
    initialize: function()
    {
        if (FBTrace.DBG_DRUPALFORFIREBUG)
            FBTrace.sysout("DrupalForFirebug; Drupal for Firebug extension initialize");
        
        Firebug.registerStringBundle("chrome://drupalforfirebug/locale/drupalforfirebug.properties");
        Firebug.registerModule(MyModule);
        Firebug.registerUIListener(MyListener);
        Firebug.registerPanel(MyPanel);
    },

    shutdown: function()
    {
        if (FBTrace.DBG_DRUPALFORFIREBUG)
            FBTrace.sysout("DrupalForFirebug; Drupal for Firbug extension shutdown");

        // Unregister all registered Firebug components
        Firebug.unregisterPanel(Firebug.MyPanel);
        Firebug.unregisterModule(Firebug.MyModule);
        Firebug.unregisterUIListener(MyListener);
        Firebug.unregisterStylesheet("chrome://drupalforfirebug/skin/hellobootamd.css");
        Firebug.unregisterStringBundle("chrome://drupalforfirebug/locale/drupalforfirebug.properties");

    }
}

// ********************************************************************************************* //

return theApp;

// ********************************************************************************************* //
});
