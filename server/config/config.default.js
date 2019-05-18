/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1558001095122_507';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    appName: 'chatServer',
  };
  config.mongoose = {
    url: 'mongodb://127.0.0.1:27017/chat',
  };
  config.redis = {
    client: {
      port: 6379,
      host: '127.0.0.1',
      password: 'auth',
      db: 0,
    },
  };
  config.middleware = [ 'error' ];

  config.security = {
    csrf: false,
    ctoken: false,
  };


  return {
    ...config,
    ...userConfig,
  };
};
