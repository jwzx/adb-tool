'use strict';

const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');
const { Controller } = require('ee-core');
const { app: electronApp, shell } = require('electron');
const dayjs = require('dayjs');
const Ps = require('ee-core/ps');
const Log = require('ee-core/log');
const Services = require('ee-core/services');
const Conf = require('ee-core/config');
const Addon = require('ee-core/addon');
const EE = require('ee-core/ee');

/**
 * electron-egg adb - 功能demo
 * @class
 */
class AdbController extends Controller {

  constructor(ctx) {
    super(ctx);
  }

  /**
   * 所有方法接收两个参数
   * @param args 前端传的参数
   * @param event - ipc通信时才有值。详情见：控制器文档
   */

  /**
   * 获取本机ips
   */
  async getIps(args) {

    let ips = await Services.get('adb').getIps();

    return ips;
  }
  /**
  * adb连接
  */
  async adbConnect(args) {
    const { action, adbHost, adbPort, packageName, ipHost, ipPort,command } = args;

    const data = {
      action,
      result: null,
      outList: [],
      code: 0
    };



    switch (action) {
      // 杀掉服务
      case "kill-server":
        // 查看设备
      case "devices":
        // 断开连接
      case "disconnect":
        data.result = await Services.get('adb').adbAction(action);
        break;
        // 应用列表
      case "packages":
        data.result = await Services.get('adb').adbAction(`shell pm list packages -3`);
        break;
        // 打开应用
      case "monkey":
        data.result = await Services.get('adb').adbAction(`shell monkey -p ${packageName} -v 1`);
        break;
        // 关闭应用
      case "clear":
        data.result = await Services.get('adb').adbAction(`shell pm clear -p ${packageName} `);
        break;
      // 设置代理
      case "setProxy":
        data.result = await Services.get('adb').adbAction(`shell settings put global http_proxy ${ipHost}:${ipPort}`);
        break;
      case "getProxy":
        data.result = await Services.get('adb').adbAction(`shell settings get global http_proxy `);
        break;
      case 'clearProxy':
        data.result = await Services.get('adb').adbAction(`shell settings put global http_proxy :0`);
        break;
        break;
      case "connect":
        data.result = await Services.get('adb').adbConnect(adbHost,adbPort);;
        break;
      case "command":
        data.result = await Services.get('adb').adbAction(command);
        break;
      default:
        data.result = await Services.get('adb').adbAction(action);

    }
    return data


  }









  /**
   * 测试接口
   */
  hello(args) {
    Log.info('hello ', args);
  }
}

AdbController.toString = () => '[class AdbController]';
module.exports = AdbController;  