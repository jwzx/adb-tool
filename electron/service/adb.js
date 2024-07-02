/*
 * @Description: 
 * @Author: jwzx
 * @Date: 2024-06-03 17:35:07
 * @LastEditTime: 2024-07-01 19:16:54
 * @LastEditors: jwzx
 * @FilePath: \adbTool\electron\service\adb.js
 */
'use strict';

const { Service } = require('ee-core');
const path = require('path');
const fs = require("fs");
const {exec,execSync} = require("child_process");
const os = require("node:os");
const dayjs = require("dayjs")
const Ps = require('ee-core/ps');
const log = require("ee-core/log")


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
        let ps = Ps.getExtraResourcesDir();
        let adbPath = path.join("adb","adb.exe");
        if(!fs.existsSync(path.join(ps,adbPath))){
            adbPath = "adb";
        }
        let adb = `cd ${ps} &&  ${adbPath} ${action}`;
        // if(action.includes("logcat")){
        //     return {
        //         title: `${dayjs().format()}  ${adb}`,
        //         result:"不支持日志输出"
        //     } 
        // }
        try {
            let output =  "";
            if(adb.includes("logcat")  ){
                 exec(adb,{maxBuffer: 1024 * 1024 * 10},(error,stdout,stderr)=>{
                    if(error){
                        log.error(`${adb} 失败结果：%s`,error)
                        result = error.stdout.toString()
                    }else{
                        log.info(`${adb} 成功结果：%s`,stdout)
                        result =stdout.toString()
                    }
                })
            }else{
                output = execSync(adb)
            }
           
            result = output.toString() || `${action} success`;
            log.info(`${adb} 成功结果：%s`,result)
        } catch (error) {
            log.error(`${adb} 失败结果：%s`,error)
            result = error.stdout.toString()
        }
        return {
            title: `${dayjs().format()}  ${adb}`,
            result:result
        } 
    }

    async adbConnect(adbHost,adbPort){
        let result = "";
        // if(!adbHost || !adbPort){
        //     return "设备ip地址或端口不能为空"
        // }
        let command = `connect ${adbHost}`
        if(adbPort){
            command = `connect ${adbHost}:${adbPort}`
        }
        result = await this.adbAction(command);

       
        return result
    }
        
}

AdbService.toString = () => '[class AdbService]';
module.exports = AdbService;  