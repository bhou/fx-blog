# Wavelet

Internal name: fx-wavelet

A new way to develop your backend application.

## Installation
``````` sh
npm install -g wavelet
```````

## Usage

````` sh
Usage: wavelet [action] [options]
Action:

start [app] [options]   start an application
 App: application path, by default: current working directory
 Options:
   --config: the wavelet configuration file, by default {your app}/app.js
   --root: the web app root
   --port: the web app port
   --disableEditor: disable the application editor
 Plugin Options:

create [project] [options]    create a wavelet project
  Options:
  -g: use global repository

install [plugin name/wavelet name] [version] [options]   install plugin or wavelet
  plugin name/wavelet name: optional, the plugin or wavlet to install, if not specified it will look for the wavelet.json file
  version: optional, the version of plugin or wavelet to install, if not specified the latest version will be installed
  Options:
  -g install the plugin to global repository otherwise install it locally

install pack [pack name]    install plugin or wavelet package
 plugin/wavelet pack could be a name or a pack file path
   Example: wavelet install pack core
   Example: wavelet install pack .pack.json

get repo   get repository location

set repo [location]  set repository location

Runtime options:
-c fx-runtime config file, could be any nodejs requirable file (json, js etc. By defaut: ./config.js)
-d debug, toggle debug
-h help
`````


## global variable registered
**Wavelet** inherits the gloabl variables defined in fx-runtime. Besides, it registers the following global variables:

#### root
the web app root. You need to register all your route in your plugin start with this root

For example
``````javascript
webapp.use(root + '/register', function(req, res) {
});

webapp.post(root + '/login', function(req, res) {
});
``````
It could be configured in config file or through command line argument --root


## Format of config file
Wavelet config file could be a json or a js file, or any nodejs requirable files.
Config file must return a json object with following fields:

- apps: [optional] the list of application plugin
- home: the home path of your application
- root: the root web path, default ''
- binding: [optional] service implementation binding
- pluginSearchPaths: a list of paths to locate your plugins
- defaultPluginConfig: default plugin configs. [JSON object] key is the plugin name, value is the config object
- whiteList: [optional] the white list of plugin
- blackList: [optional] the black list of plugin

Example:
````` javascript
module.exports = {
  "home": __dirname,
  "pluginSearchPaths": [
    __dirname + '/plugins',
    __dirname + '/../../fx-plugins'
  ],
  "defaultPluginConfig": {
    "fx-mongodb": {

    }
  }
};
`````


