module.exports = {
  "apps": [
    "fx-blog-pack",
    //"fx-wavelet-debug"
  ],
  "home": __dirname,
  "root": '',
  "pluginSearchPaths": [
    __dirname + '/plugins', // first read the local plugins
    __dirname + '/repo' + '/plugins/node_modules',  // global plugins
    __dirname + '/repo' + '/wavelets/node_modules' // global red node plugin
  ],
  "binding": {},
  "defaultPluginConfig": {
    "fx-red": {
      "flowFile": __dirname + "/.node-red/flow.json",
      "userDir": __dirname + "/.node-red",
      "nodesDir": [
        __dirname + '/repo' + '/wavelets/node_modules'
      ],
      "httpAdminRoot": "/editor",
      "httpNodeRoot": "/"
    }
  }
};
