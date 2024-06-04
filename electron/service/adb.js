/*
 * @Description: 
 * @Author: jwzx
 * @Date: 2024-06-03 17:35:07
 * @LastEditTime: 2024-06-04 14:42:42
 * @LastEditors: jwzx
 * @FilePath: \electorn-egg\electron\service\adb.js
 */
'use strict';

const { Service } = require('ee-core');
const path = require('path');
const {exec,execSync} = require("child_process");
const os = require("node:os");
const dayjs = require("dayjs")


class AdbService extends Service {

    constructor (ctx) {
        super(ctx);
       
    }
    async getIps(user) {
        let ips = [];
        Object.keys(os.networkInterfaces()).forEach(val1=>{
            // console.log(os.networkInterfaces()[val])
            // if(val.toLocaleLowerCase().includes("wlan")){
                os.networkInterfaces()[val1].forEach(val=>{
                    if(val.family=='IPv4'){
                        console.log("ipv4",val.address);
                        ips.push({name:val1,address:val.address})
                    }
                })
            // }
            
        })
        return ips
    }
    async adbAction(action) {
        let ips = [];
        let result = "";
        let adb = `adb ${action}`
        try {
            let output =  execSync(adb);
            result = output.toString() || `${action} success`
        } catch (error) {
            result = error.stdout.toString()
        }
        return {
            title: `${dayjs().format()}  ${adb}`,
            result:result
        } 
    }

    async adbConnect(adbHost,adbPort){
        let result = "";
        if(!adbHost || !adbPort){
            return "设备ip地址或端口不能为空"
        }

        result = await this.adbAction(`connect ${adbHost}:${adbPort}`);

       
        return result
    }
        
}

AdbService.toString = () => '[class AdbService]';
module.exports = AdbService;  