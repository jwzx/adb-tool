<template>
  <div id="app-base-file">
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
        2. 设置基础信息
      </span>
    </div>
    <div class="one-block-2">
      <a-row>
        <a-col :span="12">
          <a-input v-model="dir_path" :value="dir_path" addon-before="保存目录" />
        </a-col>
        <a-col :span="12">
          <a-button @click="selectDir">
            设置目录
          </a-button>
          <a-button @click="openDirectry(dir_path)">
            打开目录
          </a-button>
        </a-col>

      </a-row>
      <a-row>
        <a-col :span="12">
          <a-input v-model.value="file_name" name="file_name" @input="handleInput($event)" :disabled="isDisabled"
            :value="file_name" addon-before="自定义文件名" />
        </a-col>
        <a-col :span="5">
          <a-radio-group v-model:value="isCustom" name="radioGroup">
            <a-radio value="1">是</a-radio>
            <a-radio value="0">否</a-radio>
          </a-radio-group>
        </a-col>


      </a-row>
    </div>
    <div class="one-block-1">
      <span>
        3、截屏
      </span>
    </div>
    <div class="one-block-2">
      <a-row>
        <a-col :span="24">
          <a-button @click="scrrenFun('command')">
            截屏
          </a-button>
          <a-button @click="openDirectry(dir_path)">
            打开目录
          </a-button>
        </a-col>

      </a-row>

      <a-flex wrap="wrap" gap="small" class="flex" v-if="screenPics.length">
        <a-card hoverable style="width: 200px" v-for="(item, idx) in screenPics" :key="idx">
          <template #cover>
            <a-image :width="200" :src="item.img" :alt="item.img" />
          </template>
          <a-card-meta :title="item.title">
            <template #description>{{ item.img }}</template>
          </a-card-meta>
        </a-card>
      </a-flex>
    </div>
    <div class="one-block-1">
      <span>
        4. 连接日志
      </span>
    </div>
    <div class="one-block-2">
      <a-row>

        <a-col :span="24">
          <a-textarea :value="connectInfo" :rows="5" placeholder="连接结果" />
        </a-col>
      </a-row>

    </div>
   
  </div>
</template>
<script>
import { ipcApiRoute } from '@/api/main';
import { ipc } from '@/utils/ipcRenderer';
import storage from 'store2';



export default {
  data() {
    return {
      action_url: '',
      image_info: [],
      num: 0,
      servicAddress: '',
      dir_path: "",
      file_name: "",
      // 是否自定义
      isCustom: "0",
      // 文件下标
      fileIndex: 0,
      // 截屏图片
      screenPics: [],
      connectInfo: "",
      isNext: true,
      isInit: false,
      command: "",
    };
  },
  mounted() {
    // debugger
    this.getHost();
    this.init();

  },

  // watch: {
  //   isCustom: {
  //     handler(val) {
  //       console.log("isCustom", val)
  //     }
  //   },

  // },
  computed: {
    isDisabled: function () {
      let bool = !(this.isCustom == "1");
      if (this.isInit) {
        this.setVal("isCustom", this.isCustom);
      }
      return bool
    }
  },
  methods: {
    setVal(key, val) {
      try {
        sessionStorage.setItem(key, val)
      } catch (error) {
        this.$message.error(error.message)
      }
    },
    getVal(key) {
      let result = "";
      try {
        result = sessionStorage.getItem(key)
      } catch (error) {
      }
      return result
    },

    init() {
      let _this = this;
      let screenPics = this.getVal("screenPics");
      let dirPath = this.getVal("dirPath");
      let isCustom = this.getVal("isCustom");
      let fileIndex = this.getVal("fileIndex");
      let fileName = this.getVal("fileName");

      if (fileIndex) {
        this.fileIndex = +fileIndex;
      }
      if (isCustom) {
        this.isCustom = isCustom;
      }
      if (isCustom == "1") {
        this.file_name = fileName;
      }


      if (screenPics) {
        try {
          screenPics = JSON.parse(screenPics);
          _this.screenPics = [].concat(screenPics)
        } catch (error) {

        }
      }
      if (dirPath) {
        _this.dir_path = dirPath;
      }

      this.isInit = true;

      this.adbConnect("command", "devices", "", function (res) {
        // debugger
        let result = res?.result?.result || "";
        let result1 = result.split(/\r\n/).filter(val => {
          if (val.match(/device$/)) {
            return val.split(/\t+/)[0]
          }
        })
        if (!result1.length) {
          _this.$message.warn("adb未连接,请连接adb")
          _this.isNext = false;
        } else {
          _this.isNext = true;
        }

      })

    },
    handleInput(e) {
      this[e.target.name] = e.target.value
      this.setVal("fileName", e.target.value);
      // this.adbHost = e.target.value;
      this.$forceUpdate()
    },
    scrrenFun(action, isNext) {
      var _this = this;
      let command = ``;
      if (!this.isNext && !isNext) return;
      let fileName = `${this.file_name ? this.file_name : ""}${this.fileIndex}.png`
      command = `shell screencap -p /sdcard/${fileName}`;
      if (!this.dir_path) {
        this.$message.warn("请设置保存文件夹")
        return
      }

      if (isNext) {
        command = `pull /sdcard/${fileName} ${this.dir_path}`;
      }
      this.adbConnect(action, command, isNext, function (res) {
        if (!isNext) {
          _this.scrrenFun("command", true)

        } else {
          _this.isNext = true;
          _this.fileIndex++;
          _this.screenPics.push({
            img: `${_this.dir_path}\\${fileName}`,
            title: fileName
          })

          _this.setVal("screenPics", JSON.stringify(_this.screenPics))
          _this.setVal("fileIndex", _this.fileIndex)
        }
      })
    },
    adbConnect(action, command, isNext, cb) {
      // debugger
      var _this = this;
      if (!this.isNext && !isNext) {
        this.$message.warn("adb未连接或者程序还在进行中...")
        return;
      }


      this.isNext = false;

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

        _this.connectInfo = res.result.title + "\n" + res.result.result + "\n" + this.connectInfo;
        cb && cb(res)
      })
    },

    getHost() {
      ipc.invoke(ipcApiRoute.checkHttpServer, {}).then(r => {
        if (r.enable) {
          this.servicAddress = r.server;
          storage.set('httpServiceConfig', r);

          // url转换
          const host = r.server || 'http://localhost:7071';
          let uri = ipcApiRoute.uploadFile;
          let url = uri.split('.').join('/');
          this.action_url = host + '/' + url;
        }
      })
    },
    openDirectry(id) {
      ipc.invoke(ipcApiRoute.openDirectory, { id: id }).then(res => {
        //console.log('res:', res)
      })
    },
    selectDir() {
      ipc.invoke(ipcApiRoute.selectFolder, '').then(r => {

        this.setVal("dirPath", r);
        this.dir_path = r;
        this.$message.info(r);
      })
    },
    messageShow() {
      ipc.invoke(ipcApiRoute.messageShow, '').then(r => {
        this.$message.info(r);
      })
    },
    messageShowConfirm() {
      ipc.invoke(ipcApiRoute.messageShowConfirm, '').then(r => {
        this.$message.info(r);
      })
    },
    handleFileChange(info) {
      console.log('handleFileChange-----');
      if (this.action_url == '') {
        this.$message.error('http服务未开启');
        return;
      }
      const status = info.file.status;
      if (status !== 'uploading') {
        console.log(info.file);
      }
      if (status === 'done') {
        const uploadRes = info.file.response;
        console.log('uploadRes:', uploadRes)
        if (uploadRes.code !== 'success') {
          this.$message.error(`file upload failed ${uploadRes.code} .`);
          return false;
        }
        this.num++;
        const picInfo = uploadRes.data;
        picInfo.id = this.num;
        picInfo.imageUrlText = 'image url';
        this.image_info.push(picInfo);
        this.$message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        this.$message.error(`${info.file.name} file upload failed.`);
      }
    },
  }
};
</script>
<style lang="less" scoped>
#app-base-file {
  padding: 0px 10px;
  text-align: left;
  width: 100%;

  .one-block-1 {
    font-size: 16px;
    padding-top: 10px;
  }

  .one-block-2 {
    padding-top: 10px;

    .flex {
      display: flex;
      flex-wrap: wrap;
    }
  }

  .footer {
    padding-top: 10px;
  }
}
</style>
