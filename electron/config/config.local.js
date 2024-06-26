/*
 * @Description: 
 * @Author: jwzx
 * @Date: 2023-11-28 14:54:58
 * @LastEditTime: 2024-06-25 18:37:11
 * @LastEditors: jwzx
 * @FilePath: \adbTool\electron\config\config.local.js
 */
'use strict';

/**
 * 开发环境配置，覆盖 config.default.js
 */
module.exports = (appInfo) => {
  const config = {};

  /**
   * 开发者工具
   */
  config.openDevTools = {
    // mode: 'undocked'
    mode: 'right'
  };

  /**
   * 应用程序顶部菜单
   */
  config.openAppMenu = true;

  /**
   * jobs
   */
  config.jobs = {
    messageLog: true
  };   

  return {
    ...config
  };
};
