'use strict';

const { Service } = require('ee-core');
const Storage = require('ee-core/storage');
const _ = require('lodash');
const path = require('path');

/**
 * json数据存储
 * @class
 */
class JsondbService extends Service {

  constructor(ctx) {
    super(ctx);

    // jsondb数据库
    this.jsonFile = 'adb';
    this.adbDB = Storage.connection(this.jsonFile);
    this.adbDBKey = {
      adb_data: 'adb_data'
    };
  }
  async setAdbData(data) {
    let adbData = await this.getAllAdbData();
    // if(adbData && adbData.length > 0){
    //   adbData = [].concat(data);
    // }
    let result = "";
    try {

     let  result1  = await this.adbDB.db.set(this.adbDBKey.adb_data, data).write();
      result = result1[this.adbDBKey.adb_data]
    } catch (error) {
      result = error.stack
    }
    return result || "";
  }
  /*
   * 增 Test data
   */
  async addAdbData(user) {
    const key = this.adbDBKey.adb_data;
    if (!this.adbDB.db.has(key).value()) {
      this.adbDB.db.set(key, []).write();
    }

    const data = this.adbDB.db
      .get(key)
      .push(user)
      .write();

    return data;
  }

  /*
   * 删 Test data
   */
  async delAdbData(keycode = '') {
    const key = this.adbDBKey.adb_data;
    const data = this.adbDB.db
      .get(key)
      .remove({ keycode: keycode })
      .write();

    return data;
  }

  /*
   * 改 Test data
   */
  async updateAdbData(name = '', keycode = "") {
    const key = this.adbDBKey.adb_data;
    const data = this.adbDB.db
      .get(key)
      .find({ name: name }) // 修改找到的第一个数据，貌似无法批量修改 todo
      .assign({ keycode: keycode })
      .write();

    return data;
  }

  /*
   * 查 Test data
   */
  async getAdbData(name = "") {
    const key = this.adbDBKey.adb_data;
    let data = this.adbDB.db
      .get(key)
      .find({ name: name }) //查找单个
      // .filter(function(o) {
      //   let isHas = true;
      //   isHas = age === o.age ? true : false;
      //   return isHas;
      // })
      //.orderBy(['age'], ['name']) 排序
      //.slice(0, 10) 分页
      .value();

    if (_.isEmpty(data)) {
      data = []
    }

    return data;
  }

  /*
   * all Test data
   */
  async getAllAdbData() {
    const key = this.adbDBKey.adb_data;
    if (!this.adbDB.db.has(key).value()) {
      this.adbDB.db.set(key, []).write();
    }
    let data = this.adbDB.db
      .get(key)
      .value();

    if (_.isEmpty(data)) {
      data = []
    }

    return data;
  }

  /*
   * get data dir (sqlite)
   */
  async getDataDir() {
    const dir = this.adbDB.getStorageDir();

    return dir;
  }

  /*
   * set custom data dir (sqlite)
   */
  async setCustomDataDir(dir) {
    if (_.isEmpty(dir)) {
      return;
    }

    // the absolute path of the db file
    const dbFile = path.join(dir, this.jsonFile);
    this.adbDB = Storage.connection(dbFile);

    return;
  }
}

JsondbService.toString = () => '[class JsondbService]';
module.exports = JsondbService;
