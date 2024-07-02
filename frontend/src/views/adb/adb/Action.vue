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
        <a-col :span="20">
          <a-input v-model.value="text" :value="text" name="text" placeholder="输入的字符"
            @input="handleInput($event)" addon-before="字符输入" />
        </a-col>
        <a-col :span="4">
          <a-button @click="adbConnect('commandText')">
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
      <!-- <a-row> -->

        <a-flex wrap="wrap" gap="small"  v-for="(item, index) in commands" :key="index">
          <a-button @click="adbConnect('command', item.keycode)">
            {{ item.name }}
          </a-button>
        </a-flex>
      <!-- </a-row> -->
    </div>
    <div class="one-block-1">
      <span>
        3. 连接日志
      </span>
    </div>
    <div class="one-block-2">
      <a-row>

        <a-col :span="24">
          <a-textarea :value="connectInfo" :rows="5" placeholder="连接结果" />
        </a-col>
      </a-row>

    </div>
    <div class="one-block-1">
      <span>
        4. 编辑指令
      </span>
    </div>
    <div class="one-block-2">
      <Table :commands="commands" @updateCommands="updateCommands"></Table>
    </div>

    <div class="one-block-2">
      <a-descriptions title="命令实例" bordered>
        <a-descriptions-item label="输入字符abc" :span="1">adb shell input text abc</a-descriptions-item>
        <a-descriptions-item label="可以解锁屏幕" :span="2">adb shell input keyevent 82</a-descriptions-item>
        <a-descriptions-item label="在屏幕上点击坐标点x=50 y=250的位置" :span="3">adb shell input tap 50 250</a-descriptions-item>
        <a-descriptions-item label="这条命令相当于按了设备的Backkey键" :span="3">adb shell input keyevent 4</a-descriptions-item>
        <a-descriptions-item label="在屏幕上做划屏操作，前四个数为坐标点，后面是滑动的时间(单位毫秒)" :span="4">adb shell input swipe 50 250 250 250
          500</a-descriptions-item>
      </a-descriptions>
    </div>


    <Desc></Desc>


  </div>
</template>
<script>
import { ipcApiRoute } from '@/api/main';
import { defineAsyncComponent,ref,reactive,watchEffect } from "vue"
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
      text:"abc",
      connectInfo: "",
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
      isNext: true,
      isInit:false,

    };
  },
  watch:{
    command:{
      handler(val) {
        console.log("parentcommands",val)
        // this.commands = val;
      },
      immediate: true,
      deep: true,
    },
  },

 async beforeMount() {
  var _this = this;
  // watchEffect( () => {
  await _this.init();
  // ))
   

  },

  components: {
    Desc,
    Table
    // Table:()=>import("@/views/adb/adb/compones/Table.vue")
  },
  methods: {
    async init() {
      let _this = this;
// debugger
      let keyCodeJson = await ipc.invoke(ipcApiRoute.jsondbOperation, {
        action: "getAll"
      })
      console.log("keyCodeJson", keyCodeJson)
      if (keyCodeJson.result && keyCodeJson.result.length == 0) {
        this.updateCommands(this.commands);

      }else{
        this.commands = keyCodeJson.result;
        console.log("this.commands", this.commands)
      }
    this.isInit = true;

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
     
      // console.log()



    },

   async updateCommands(e) {
    if(!this.isInit) return;
    if(!e.length  ) return;
    this.isInit = false;
      this.commands =e;;
      let info = JSON.stringify(this.commands);
      try {
          let result = await ipc.invoke(ipcApiRoute.jsondbOperation,  {
            action: "set",
            info: info
,
          })
          console.log("result", result)
        } catch (error) {
          console.log("setData",error)
        }
        this.isInit = true;
     
      // this.commands = e;

    },
    handleInput(e) {
      this[e.target.name] = e.target.value
      // this.adbHost = e.target.value;
      this.$forceUpdate()
    },

    adbConnect(action, keyCode) {

      var _this = this;
      if (!this.isNext) return;
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
        case "commandText":
          params = {
            action: "command",
            command: `shell input text ${_this.text}`

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
        if(typeof keyCode == "function"){
          keyCode(res)
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
