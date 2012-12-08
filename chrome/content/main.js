/* See license.txt for terms of usage */

define([
    "firebug/lib/trace",
    "drupalforfirebug/myPanel",
    "drupalforfirebug/myModule",
],
function(FBTrace, MyPanel, MyModule) {

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

        // Registration of Firebug panels and modules is made within appropriate files,
        // but it could be also done here.

        // TODO: Extension initialization
    },

    shutdown: function()
    {
        if (FBTrace.DBG_DRUPALFORFIREBUG)
            FBTrace.sysout("DrupalForFirebug; Drupal for Firbug extension shutdown");

        // Unregister all registered Firebug components
        Firebug.unregisterPanel(Firebug.MyPanel);
        Firebug.unregisterModule(Firebug.MyModule);
        Firebug.unregisterStylesheet("chrome://drupalforfirebug/skin/hellobootamd.css");
        Firebug.unregisterStringBundle("chrome://drupalforfirebug/locale/hellobootamd.properties");

        // TODO: Extension shutdown
    }
}

// ********************************************************************************************* //

return theApp;

// ********************************************************************************************* //
});
