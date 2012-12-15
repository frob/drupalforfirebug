==================
Drupal For Firebug
==================
**DrupalForFirebug** is a Mozilla Firefox extension that adds a 
{{ "Druapl"|http://drupal.org }} pane to the 
{{ Firebug|http://getfirebug.com }} Firefox extension. This pane contains some
common debug information from the Drupal site. This plugin also requires the
{{ DrupalForFirebug|http://drupal.org/project/drupalforfirebug }} Drupal
Module to be installed in the Drupal Site.

Typical Installation:
---------------------
The safest way to install is to simply download the latest approved extension
from {{ Mozilla Addons|https://addons.mozilla.org/en-US/firefox/addon/drupal-for-firebug }}.
This way your extension will be able to auto update as the extension is vetted
by Mozilla.

.xpi Latest Release
-------------------
To get the latest *stable* release you can go to the {{ Repository Download Page|https://bitbucket.org/frob/drupalforfirebug/downloads}}
and download the newest .xpi. This file should be opened by Firefox and
install the DrupalForFirebug extension.

Install From Source
-------------------
To install from source: 
(This is [very] helpful if you know how to write Firebug
plugins and want to help.)

1. First Download this repository.
2. Find the location of your Firefox Profile.
   a) You should setup an extension development environment if you plan on
   contributing.
   
3. Put a text file in your profile/extensions directory that only has the
absolute path to the root of the repository. The name of this file should be
the UUID of the extension.

For instance this is the command I use to create this file.
`echo "/Users/FrankAnderson/repos/firefox/extensions/drupalforfirebug" > DrupalForFirebug@drupal.org`
