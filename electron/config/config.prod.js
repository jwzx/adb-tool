/*
 * @Description: 
 * @Author: jwzx
 * @Date: 2023-11-29 10:13:26
 * @LastEditTime: 2024-06-04 14:01:27
 * @LastEditors: jwzx
 * @FilePath: \electorn-egg\electron\config\config.prod.js
 */
'use strict';

/**
 * 生产环境配置，覆盖 config.default.js
 */
module.exports = (appInfo) => {
  const config = {};

  /**
   * 开发者工具
   */
  config.openDevTools = {
    mode: 'undocked'
  };

  /**
   * 应用程序顶部菜单
   */
  config.openAppMenu = false;

  /**
   * 开发者工具
   */
  config.openDevTools = false;
  /**
   * jobs
   */
  config.jobs = {
    messageLog: false
  }; 

  return {
    ...config
  };
};
