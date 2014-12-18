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
      tooltiptext: "These are messages that can be placed anywhere in the code and are displayed in the Drupal for Firebug console window. They work in much the same was as drupal_set_message().",
      hook: "general"
    }, {
      label:"SQL",
      tooltiptext: "This is a Drupal for Firebug display of the Devel module query log.",
      hook: "sql"
    }, {
      label:"Forms",
      tooltiptext: "All forms that are processed by hook_form_alter() are displayed here. Any changes(Yellow), additions(Green), or deletions(Red) are appropriately color coordinated in the output.",
      hook: "hook_form_alter"
    }, {
      label:"Users",
      tooltiptext: "The user records and associated $op performed on each one by hook_user().",
      hook: "hook_user"
    }, {
      label:"Nodes",
      tooltiptext: "All nodes that are processed by hook_nodeapi() are displayed here along with the $op applied to them.",
      hook: "hook_nodeapi"
    }, {
      label:"Views",
      tooltiptext: "Each view that is loaded or themed is displayed with any changes(Yellow), additions(Green), or deletions(Red) are appropriately color coordinated in the output.",
      hook: "hook_views"
    }, {
      label:"Execute PHP",
      tooltiptext: "This tab allows PHP code to be executing in much the same was as the \"Execute PHP\" block works in the Devel module. Users must be given special permissions to use this feature.",
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
      var parserUtils = Components.classes["@mozilla.org/parserutils;1"]
                        .getService(Components.interfaces.nsIParserUtils);

      // get the currently requested content
      var drupalFirebugContent = false;
      if (content.document.getElementById('drupalforfirebug_' + filterCategory) != null ) {
        drupalFirebugContent = element.cloneNode(true);
      }

      //hidden = drupalFirebugContent.getElementsByClassName("content");
      // remove the style="hidded" from the .content elements.
      //for(var i = 0; i < hidden.length; i++) {
      //   hidden[i].removeAttribute("style");
      //}

      if(drupalFirebugContent) {
        this.panel = parserUtils.sanitize(drupalFirebugContent.innerHTML, 0);
      }
      else {
        this.panel = error;
      }

      if (FBTrace.DBG_DRUPALFORFIREBUG) {
        FBTrace.sysout("DrupalForFirebug; DrupalConnection.changePanel", parserUtils);
      }

    },

    onButton: function(hook, panel) {
      this.currentButton = hook;
      this.changePanel(hook);

      if (FBTrace.DBG_DRUPALFORFIREBUG) {
        FBTrace.sysout("DrupalForFirebug; DrupalConnection.onButton", this);
      }

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
