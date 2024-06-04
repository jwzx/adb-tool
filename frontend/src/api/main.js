/*
 * @Description: 
 * @Author: jwzx
 * @Date: 2023-11-29 10:13:26
 * @LastEditTime: 2024-06-03 18:23:48
 * @LastEditors: jwzx
 * @FilePath: \electorn-egg\frontend\src\api\main.js
 */

/**
 * 主进程与渲染进程通信频道定义
 * Definition of communication channels between main process and rendering process
 */
const ipcApiRoute = {
  // framework
  test: 'controller.example.test',
  checkForUpdater: 'controller.framework.checkForUpdater',
  downloadApp: 'controller.framework.downloadApp',
  jsondbOperation: 'controller.framework.jsondbOperation',
  sqlitedbOperation: 'controller.framework.sqlitedbOperation',
  uploadFile: 'controller.framework.uploadFile',
  checkHttpServer: 'controller.framework.checkHttpServer',
  doHttpRequest: 'controller.framework.doHttpRequest',
  doSocketRequest: 'controller.framework.doSocketRequest',
  ipcInvokeMsg: 'controller.framework.ipcInvokeMsg',
  ipcSendSyncMsg: 'controller.framework.ipcSendSyncMsg',
  ipcSendMsg: 'controller.framework.ipcSendMsg',
  startJavaServer: 'controller.framework.startJavaServer',
  closeJavaServer: 'controller.framework.closeJavaServer',
  someJob: 'controller.framework.someJob',
  timerJobProgress: 'controller.framework.timerJobProgress',
  createPool: 'controller.framework.createPool',
  createPoolNotice: 'controller.framework.createPoolNotice',
  someJobByPool: 'controller.framework.someJobByPool',
  hello: 'controller.framework.hello',
  openSoftware: 'controller.framework.openSoftware', 

  // os
  messageShow: 'controller.os.messageShow',
  messageShowConfirm: 'controller.os.messageShowConfirm',
  selectFolder: 'controller.os.selectFolder',
  selectPic: 'controller.os.selectPic',
  openDirectory: 'controller.os.openDirectory',
  loadViewContent: 'controller.os.loadViewContent',
  removeViewContent: 'controller.os.removeViewContent',
  createWindow: 'controller.os.createWindow',
  getWCid: 'controller.os.getWCid',
  sendNotification: 'controller.os.sendNotification',
  initPowerMonitor: 'controller.os.initPowerMonitor',
  getScreen: 'controller.os.getScreen',
  autoLaunch: 'controller.os.autoLaunch',
  setTheme: 'controller.os.setTheme',
  getTheme: 'controller.os.getTheme',

  // hardware
  getPrinterList: 'controller.hardware.getPrinterList',
  print: 'controller.hardware.print',
  printStatus: 'controller.hardware.printStatus',

  // effect
  selectFile: 'controller.effect.selectFile',
  loginWindow: 'controller.effect.loginWindow',
  restoreWindow: 'controller.effect.restoreWindow',

  // adb
  getIps : "controller.adb.getIps",
  adbConnect : "controller.adb.adbConnect",
}

/**
 * 自定义频道
 * custom chennel
 */
const specialIpcRoute = {
  appUpdater: 'app.updater', // updater channel
  window1ToWindow2: 'window1-to-window2', // windows channel
  window2ToWindow1: 'window2-to-window1', // windows channel
}

export {
  ipcApiRoute, specialIpcRoute
}

