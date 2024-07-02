<template>
  <div id="app-base-db">
    <div class="one-block-1">
      <span>
        1. 获取本机Ips
      </span>
    </div>  
    <div class="one-block-2">
      <a-row v-for="(ip,idx) in ips" :key="'ips'+idx">
        <a-col :span="10" >
          {{ip.name}}:
        </a-col>
        <a-col :span="8" >
          {{ ip.address }}
        </a-col>
      
      </a-row>
    </div>
    <div class="one-block-1">
      <span>
        2. 连接adb
      </span>
    </div>  
    <div class="one-block-2">
      <a-row>
        <a-col :span="12">
          <a-input v-model.value="adbHost" :value="adbHost" name="adbHost"  @input="handleInput($event)"    addon-before="设备Ip" />
        </a-col>
        <a-col :span="8">
          <a-input v-model.value="adbPort" :value="adbPort" name="adbPort"  @input="handleInput($event)"   addon-before="设备端口" />
        </a-col>
        <a-col :span="4">
          <a-button @click="adbConnect">
            连接
          </a-button>
        </a-col>
        <a-col :span="4">
          <a-button @click="adbConnect('kill-server')">
            清除服务
          </a-button>
        </a-col>
        <a-col :span="4">
          <a-button @click="adbConnect('disconnect')">
            断开连接
          </a-button>
        </a-col>
        <a-col :span="5">
          <a-button @click="adbConnect('devices')">
            查看连接设备
          </a-button>
        </a-col>
        <a-col :span="4">
          <a-button @click="adbConnect('packages')">
            获取应用列表
          </a-button>
        </a-col>

            
      </a-row>
    </div>       
    <div class="one-block-1">
      <span>
        3. 打开应用
      </span>
    </div>  
    <div class="one-block-2">
      <a-row>
        <a-col :span="12">
          <a-input v-model.value="packageName" name="packageName"  @input="handleInput($event)"    addon-before="应用包名" />
        </a-col>
        <a-col :span="4">
          <a-button @click="adbConnect('monkey')">
            打开应用
          </a-button>
        </a-col>
        <a-col :span="4">
          <a-button @click="adbConnect('clear')">
            关闭应用
          </a-button>
        </a-col>
      </a-row>
    </div>    
    <div class="one-block-1">
      <span>
        4. 设置代理
      </span>
    </div>  
    <div class="one-block-2">
      <a-row>
        <a-col :span="12">
          <a-input v-model.value="ipHost" :value="ipHost" name="ipHost"  @input="handleInput($event)"    addon-before="代理Ip" />
        </a-col>
        <a-col :span="8">
          <a-input v-model.value="ipPort" :value="ipPort" name="ipPort"  @input="handleInput($event)"   addon-before="代理端口" />
        </a-col>
        <a-col :span="4">
          <a-button @click="adbConnect('setProxy')">
            设置代理
          </a-button>
        </a-col>
        <a-col :span="4">
          <a-button @click="adbConnect('getProxy')">
            获取代理
          </a-button>
        </a-col>
        <a-col :span="4">
          <a-button @click="adbConnect('clearProxy')">
            清除代理
          </a-button>
        </a-col>
        
            
      </a-row>
    </div>  
    <div class="one-block-1">
      <span>
        5. 自定义指令
      </span>
    </div>  
    <div class="one-block-2">
      <a-row>
      <a-col :span="20">
          <a-input v-model.value="command" :value="command" name="command"  placeholder="shell pm list packages -3 " @input="handleInput($event)"   addon-before="指令" />
        </a-col>
        <a-col :span="4">
          <a-button @click="adbConnect('command')">
            执行
          </a-button>
        </a-col>
      </a-row>
    </div>
    <div class="one-block-1">
      <span>
        6. 连接日志
      </span>
    </div>  
    <div class="one-block-2">
      <a-row>
        
        <a-col :span="24">
          <a-textarea :value="connectInfo" :rows="5"  placeholder="连接结果"  />
        </a-col>   
      </a-row>
     
    </div>    





      
  </div>
</template>
<script>
import { ipcApiRoute } from '@/api/main';
import { ipc } from '@/utils/ipcRenderer';

export default {
  data() {
    return {
      // 本机ip
      ips:[],
      adbHost:"",
      adbPort:"",
      packageName:"",
      ipHost:"",
      ipPort:"",
      connectInfo:"",
      command:""

    };
  },
 

  mounted () {
    var _this = this;
    this.init();
    this.adbConnect( "devices", function (res) {
        // debugger
        let result = res?.result?.result || "";
        let result1 = result.split(/\r\n/).filter(val => {
          if (val.match(/device$/)) {
            return val.split(/\t+/)[0]
          }
        })
        if (!result1.length) {
          _this.$message.warn("adb未连接,请连接adb")
        } 

      })

  },
  methods: {
    init() {
      ipc.invoke(ipcApiRoute.getIps).then(res => {
        this.ips = res;
        // debugger
        console.log(this.ips)
      }) 
      this.adbConnect("devices");
      this.adbConnect("getProxy");


    }, 
    handleInput(e){
      this[e.target.name] = e.target.value
      // this.adbHost = e.target.value;
      this.$forceUpdate()
    } ,
    adbConnect(action,cb){
      var _this = this;
      // debugger
      let params = {}
      switch(action){
        case "kill-server":
        case "disconnect":
        case "devices":
        case "packages":
        params={action:action}
          break;
        case "monkey":
        case "clear":
        params={
          action:action,
          packageName:this.packageName
        }
          break;
        case "setProxy":
        params = {
          action:"setProxy",
          ipHost:this.ipHost,
          ipPort:this.ipPort
        }
        break;
        case "getProxy":
        case 'clearProxy':
          params={
            action:action,
          }
          break;
          case "command":
          params={
            action:action,
            command:this.command.replace(/adb/,"")
          }
          break;
        
        default:
          params = {
          action:"connect",
          adbHost:this.adbHost,
          adbPort:this.adbPort
      }
      }
     
      ipc.invoke(ipcApiRoute.adbConnect, params).then(res => {
        this.connectInfo  = res.result.title + "\n" + res.result.result +"\n" +  this.connectInfo;
        switch(action){
          case "getProxy":
          case "clearProxy":
            let proxyIP = res.result.result.match(/[\d\.\:]+/) || [""];
            proxyIP = proxyIP[0].split(":") || []
            _this.ipHost = proxyIP[0] || "";
            _this.ipPort = proxyIP[1] || "";
           
            _this.$forceUpdate()
            console.log(action,res.result.result)
          break;
          case "devices":
            let adbIP = res.result.result.match(/[\d\.\:]+/) || [""];
              adbIP = adbIP[0].split(":") || [];
              _this.adbHost = adbIP[0] || "";
              _this.adbPort = adbIP[1] || "";
            if(typeof cb == "function"){
              cb(res)
            }
            _this.$forceUpdate()
            break;
          default:
        }
       
      }) 
    },
    

    
  }
};
</script>
<style lang="less" scoped>
#app-base-db {
  padding: 0px 10px;
  text-align: left;
  width: 100%;
  .one-block-1 {
    font-size: 16px;
    padding-top: 10px;
  }
  .one-block-2 {
    padding-top: 10px;
  }
}
</style>
