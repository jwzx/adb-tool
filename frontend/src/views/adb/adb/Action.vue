<template>
  <div id="app-base-db">
    <div class="one-block-1">
      <span>
        1. 自定义指令
      </span>
    </div>
    <div class="one-block-2">
      <a-row>
        <a-col :span="20">
          <a-input v-model.value="command" :value="command" name="command" placeholder="shell pm list packages -3 "
            @input="handleInput($event)" addon-before="指令" />
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
        2. 预制指令
      </span>
    </div>

    <div class="one-block-2">
      <a-row>

        <a-col :span="3" v-for="(item, index) in commands" :key="index">
          <a-button @click="adbConnect('command', item.keycode)">
            {{ item.name }}
          </a-button>
        </a-col>
      </a-row>
    </div>
    <div class="one-block-1">
      <span>
        3. 连接日志
      </span>
    </div>  
    <div class="one-block-2">
      <a-row>
        
        <a-col :span="24">
          <a-textarea :value="connectInfo" :rows="5"  placeholder="连接结果"  />
        </a-col>   
      </a-row>
     
    </div> 
    <div class="one-block-1">
      <span>
        4. 编辑指令
      </span>
    </div>
    <div class="one-block-2">
      <Table v-model:commands="commands"></Table>
    </div>

    <div class="one-block-2">
      <a-descriptions title="命令实例" bordered>
        <a-descriptions-item label="输入字符abc" :span="1">adb shell input text abc</a-descriptions-item>
        <a-descriptions-item label="可以解锁屏幕" :span="2">adb shell input keyevent 82</a-descriptions-item>
        <a-descriptions-item label="在屏幕上点击坐标点x=50 y=250的位置" :span="3">adb shell input tap 50 250</a-descriptions-item>
        <a-descriptions-item label="这条命令相当于按了设备的Backkey键" :span="3">adb shell input keyevent 4</a-descriptions-item>
        <a-descriptions-item label="在屏幕上做划屏操作，前四个数为坐标点，后面是滑动的时间(单位毫秒)" :span="4">adb shell input swipe 50 250 250 250 500</a-descriptions-item>
      </a-descriptions>
    </div>

  
    <Desc></Desc>


  </div>
</template>
<script>
import { ipcApiRoute } from '@/api/main';
import {defineAsyncComponent} from "vue"
import { ipc } from '@/utils/ipcRenderer';
// import Table from "./components/table.vue";
const Table = defineAsyncComponent(() =>
  import('./components/Table.vue')
)

import Desc from "./components/Desc.vue";

export default {
  data() {
    return {
      // 输入指令
      command: "shell input keyevent 3",
      connectInfo:"",
      //默认指令列表
      commands: [
        { keycode: "KEYCODE_HOME", "name": "主页" },
        { keycode: "KEYCODE_BACK", "name": "返回" },
        { keycode: "KEYCODE_VOLUME_UP", "name": "音量加" },
        { keycode: "KEYCODE_VOLUME_DOWN", "name": "音量减" },
        { keycode: "KEYCODE_VOLUME_MUTE", "name": "静音" },
        { keycode: "KEYCODE_POWER", "name": "电源" },
        { keycode: "KEYCODE_MENU", "name": "菜单" },
        { keycode: "KEYCODE_ENTER", "name": "回车" },
        { keycode: "KEYCODE_ESCAPE", "name": "退出" },
        { keycode: "KEYCODE_DEL", "name": "退格键" },
        { keycode: "KEYCODE_FORWARD_DEL", "name": "删除键" },
        { keycode: "KEYCODE_BREAK", "name": "Break键" },
        { keycode: "KEYCODE_DPAD_UP", "name": "向上" },
        { keycode: "KEYCODE_DPAD_DOWN", "name": "向下" },
        { keycode: "KEYCODE_DPAD_LEFT", "name": "向左" },
        { keycode: "KEYCODE_DPAD_RIGHT", "name": "向右" },

      ],
      isNext:true,

    };
  },
 
  mounted() {
    // this.init();

  },
  	
  components:{
    Desc ,
    Table
    // Table:()=>import("@/views/adb/adb/compones/Table.vue")
  },
  methods: {
    init() {
      // ipc.invoke(ipcApiRoute.getIps).then(res => {
      //   this.ips = res;
      //   // debugger
      //   console.log(this.ips)
      // })
      this.adbConnect("devices");
      this.adbConnect("getProxy");


    },
    handleInput(e) {
      this[e.target.name] = e.target.value
      // this.adbHost = e.target.value;
      this.$forceUpdate()
    },
    
    adbConnect(action, keyCode) {

      var _this = this;
      if(!this.isNext) return;
      this.isNext = false;
      let command = ``;
      if (keyCode) {
        command = `shell input keyevent ${keyCode}`
      }
      // debugger
      let params = {}
      switch (action) {
        case "command":
          params = {
            action: action,
            command: command || this.command.replace(/adb/, "")

          }
          break;


        default:
          params = {
            action: action,
          }
      }

      ipc.invoke(ipcApiRoute.adbConnect, params).then(res => {
        this.isNext = true;
        this.connectInfo = res.result.title + "\n" + res.result.result + "\n" + this.connectInfo;
        // switch (action) {
        //   case "getProxy":
        //   case "clearProxy":
        //     let proxyIP = res.result.result.match(/[\d\.\:]+/) || "";
        //     proxyIP = proxyIP[0].split(":") || []
        //     _this.ipHost = proxyIP[0] || "";
        //     _this.ipPort = proxyIP[1] || "";

        //     _this.$forceUpdate()
        //     console.log(action, res.result.result)
        //     break;
        //   case "devices":
        //     let adbIP = res.result.result.match(/[\d\.\:]+/) || "";
        //     adbIP = adbIP[0].split(":") || [];
        //     _this.adbHost = adbIP[0] || "";
        //     _this.adbPort = adbIP[1] || "";

        //     _this.$forceUpdate()
        //     break;
        //   default:
        // }

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
  height: 100%;
  overflow-y: scroll;

  .one-block-1 {
    font-size: 16px;
    padding-top: 10px;
  }

  .one-block-2 {
    padding-top: 10px;
    padding-bottom: 10px;
  }
}
</style>
