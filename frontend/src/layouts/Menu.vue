<template>
  <a-layout id="app-menu">
    <a-layout-sider theme="light" class="layout-sider">
      <a-menu theme="light" mode="inline" :selectedKeys="[current]" @click="changeMenu">
        <a-menu-item v-for="(menuInfo, subIndex) in menu" :key="subIndex">
          <router-link :to="{ name: menuInfo.pageName, params: menuInfo.params }">
            <span>{{ menuInfo.title }}</span>
          </router-link>
          <a-button type="link" slot="icon" @click="createWindow(menuInfo)">
            <ExportOutlined />
          </a-button>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-content>
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
// import { reactive } from 'vue'; 
import subMenu from '@/router/subMenu';
import { ipcApiRoute } from '@/api/main';
import { ipc } from '@/utils/ipcRenderer';
import { toRaw } from 'vue';

export default {
  // setup() {
  //   const state = reactive({
  //     selectedKeys: ['menu_100'],
  //   });

  //   const handleClick = e => {
  //     state.selectedKeys = [e.key];
  //   };

  //   return {
  //     state,
  //     handleClick,
  //   };
  // },
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      menu: {},
      //selectedKeys: ['menu_100'],
      current: 'menu_100',
      keys: []
    };
  },
  watch: {
    id: function () {
      // debugger
      console.log('watch id ----- ', this.id);
      this.current = 'menu_100';
      this.menuHandle();
    }
  },
  created() {
  },
  mounted() {
    this.menuHandle();
  },
  methods: {
    menuHandle() {
      // 该组件优先被加载了，所以没拿到参数
      //console.log('params:', this.$route);
      // alert('menuHandle'+ window.location.href + "|" + this.$route?.path)
      console.log("fullpath",this.$route,'menu ------ id:', this.id,'menu ------ current:',this.$route?.query?.current);
      this.menu = subMenu[this.id];
      if(this.$route?.query?.current){
        this.current = this.$route?.query?.current;
      }
      const linkInfo = this.menu[this.current];
      this.$router.push({ name: linkInfo.pageName, params: linkInfo.params });
    },
    changeMenu(e) {
      console.log('changeMenu e:', e);
      this.current = e.key;
    },
    createWindow(info) {
      // debugger
        let data = this.findByName(this.$router.options.routes, info.pageName);
        if(!data){
          this.$message.warn("找不到路由信息");
          return;
        }
        let nextPage = Object.keys(this.menu).filter(val=>{
            if(this.menu[val].pageName == info.pageName){
                return this.menu[val]
            }
        })[0];
        

        let router = {
            type: 'vue',
            content: `#${data.path}?current=${ nextPage || "" }`,
            // content: `#/adb/adb/Screencap`,
            windowName: 'window-vue',
            windowTitle: info.title
          }
          console.log(router);
        ipc.invoke(ipcApiRoute.createWindow, toRaw(router)).then(r => {
          console.log(r);
        })
    },
    findByName(obj, name) {
       let _this = this;
      if (Array.isArray(obj)) {
        for (let i = 0; i < obj.length; i++) {
          const result = _this.findByName(obj[i], name);
          if (result) {
            return result;
          }
        }
      } else if (typeof obj === 'object') {
        if (obj.name === name && obj.path) {
          return obj;
        }
        for (const key in obj) {
          if (obj.hasOwnProperty(key)) {
            const result = _this.findByName(obj[key], name);
            if (result) {
              return result;
            }
          }
        }
      }
      return null;
    }
  }
};
</script>
<style lang="less" scoped>
#app-menu {
  height: 100%;
  text-align: center;

  .layout-sider {
    border-top: 1px solid #e8e8e8;
    border-right: 1px solid #e8e8e8;
    background-color: #FAFAFA;
    overflow: auto;
  }
}
</style>
