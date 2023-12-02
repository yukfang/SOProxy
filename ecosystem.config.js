module.exports = {
  apps : [
    {
      "ignore_watch" : [
        "public"
      ],
      "watch_options": {
        "followSymlinks": false,
      },


      script  : "./index.js",
      watch   : true,
      name    : "soproxy",
      instances  : 1
    }

  ]
}