
FBL.ns(function() { with (FBL) { 
Firebug.DrupalForFirebug = extend(Firebug.Module, 
{ 
    shutdown: function()
    {
      if(Firebug.getPref('defaultPanelName')=='DrupalForFirebug') {
        Firebug.setPref('defaultPanelName','console');
      }
    },
    showPanel: function(browser, panel) 
    { 
        var isDrupalForFirebug = panel && panel.name == "DrupalForFirebug";
        var DrupalForFirebugButtons = browser.chrome.$("fbDrupalForFirebugButtons");
        collapse(DrupalForFirebugButtons, !isDrupalForFirebug);
        
        var filterCategory = 'general';
        if (document.getElementById("fbDrupalForFirebug-forms").checked == true) {
          var filterCategory = 'hook_form_alter';
        }
        if (document.getElementById("fbDrupalForFirebug-sql").checked == true) {
          var filterCategory = 'sql';
        }
        if (document.getElementById("fbDrupalForFirebug-nodes").checked == true) {
          var filterCategory = 'hook_nodeapi';
        }
        if (document.getElementById("fbDrupalForFirebug-views").checked == true) {
          var filterCategory = 'hook_views';
        }
        if (document.getElementById("fbDrupalForFirebug-users").checked == true) {
          var filterCategory = 'hook_user';
        }
        if (document.getElementById("fbDrupalForFirebug-page").checked == true) {
          var filterCategory = 'hook_page_alter';
        }
        if (document.getElementById("fbDrupalForFirebug-php").checked == true) {
          var filterCategory = 'php';
        }
        
        if (content.document.getElementById('drupalforfirebug_' + filterCategory)) { 
          var drupal_firebug_content = content.document.getElementById('drupalforfirebug_' + filterCategory).innerHTML;
          Firebug.currentContext.getPanel("DrupalForFirebug").updateSpace(drupal_firebug_content);
        } else {
          Firebug.currentContext.getPanel("DrupalForFirebug").updateSpace('No Drupal for Firebug data was found. Either this site is not running Drupal or the Drupal for Firebug module has not been installed/enabled.');
        }
    },
    hidePanel: function(browser, panel) 
    {
        Firebug.currentContext.getPanel("DrupalForFirebug").updateSpace(''); 
    },
    onToggleFilter: function(context, filterCategory)
    {
       if (content.document.getElementById('drupalforfirebug_' + filterCategory)) {
         var drupal_firebug_content = content.document.getElementById('drupalforfirebug_' + filterCategory).innerHTML;
         Firebug.currentContext.getPanel("DrupalForFirebug").updateSpace(drupal_firebug_content);
       } else {
         Firebug.currentContext.getPanel("DrupalForFirebug").updateSpace('No Drupal for Firebug data was found. Either this site is not running Drupal or the Drupal for Firebug module has not been installed/enabled.');
       }
    },
}); 

function DrupalForFirebugPanel() {} 
DrupalForFirebugPanel.prototype = extend(Firebug.Panel, 
{ 
    name: "DrupalForFirebug", 
    title: "Drupal", 
    searchable: true,
    editable: false,
    
    updateSpace: function(message) {
      this.panelNode.innerHTML = message;
      DrupalForFirebugBehaviors(this.panelNode);
    },
    search: function(text)
    {
        if (!text)
        {
            delete this.currentSearch;
            return false;
        }

        var row;
        if (this.currentSearch && text == this.currentSearch.text)
        {
            row = this.currentSearch.findNext(true);
        }
        else
        {
            if (this.editing)
            {
                this.currentSearch = new TextSearch(this.stylesheetEditor.box);
                row = this.currentSearch.find(text);

                if (row)
                {
                    var sel = this.document.defaultView.getSelection();
                    sel.removeAllRanges();
                    sel.addRange(this.currentSearch.range);
                    scrollSelectionIntoView(this);
                    return true;
                }
                else
                    return false;
            }
            else
            {
                function findRow(node) { return node.nodeType == 1 ? node : node.parentNode; }
                this.currentSearch = new TextSearch(this.panelNode, findRow);
                row = this.currentSearch.find(text);
            }
        }

        if (row)
        {
            this.document.defaultView.getSelection().selectAllChildren(row);
            scrollIntoCenterView(row, this.panelNode);
            return true;
        }
        else
            return false;
    }  
}); 

function DrupalForFirebugBehaviors(context) {
  var DFFQ = jQuery.noConflict();
  DFFQ("fieldset.toggler legend a", context)
    .click( function() {
      DFFQ(this, context)
        .parents("fieldset")
        .find("div.content")
        .toggle();
      return false;
    });
}
      
Firebug.registerModule(Firebug.DrupalForFirebug); 
Firebug.registerPanel(DrupalForFirebugPanel); 
}});

