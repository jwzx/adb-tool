<template>
  <a-layout id="app-layout-sider">
    <a-layout-sider
      v-model="collapsed"
      theme="light"
      class="layout-sider"
      width="100"
    >
      <div class="logo">
        <img class="pic-logo" src="~@/assets/logo.png">
      </div>
      <a-menu 
        class="menu-item" 
        theme="light" 
        mode="inline"
        :selectedKeys="[current]"
        @click="menuHandle"
      >
        <a-menu-item v-for="(menuInfo, index) in menu" :key="index">
          <icon-font :type="menuInfo.icon" />
          {{ menuInfo.title }} 
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-content class="layout-content">
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>

export default {
  name: 'AppSider',
  data() {
    return {
      collapsed: true,
      current: 'menu_5',
      menu: {
        // 'menu_1' : {
        //   icon: 'icon-fengche',
        //   title: '框架',
        //   pageName: 'Framework',
        //   params: {
        //     // test: 'hello'
        //   },
        // },
        // 'menu_2' : {
        //   icon: 'icon-xitongshezhi',
        //   title: '系统',
        //   pageName: 'Os',
        //   params: {},
        // },
        // 'menu_3' : {
        //   icon: 'icon-waishe',
        //   title: '硬件',
        //   pageName: 'Hardware',
        //   params: {},
        // },
        // 'menu_4' : {
        //   icon: 'icon-texiao',
        //   title: '特效',
        //   pageName: 'Effect',
        //   params: {},
        // },            
        'menu_5' : {
          icon: 'icon-ADB',
          title: 'ADB',
          pageName: 'Adb',
          params: {},
        },            
      }
    };
  },
  created () {
  },
  mounted () {
    this.menuHandle()
  },
  methods: {
    menuHandle (e) {
      console.log("fullpath",this.$route?.query?.path,'sider menu e:', e,'menu ------ current:',this.$route?.query?.current);
      
      this.current = e ? e.key : this.current;
      console.log('sider menu current:', this.current);

      const linkInfo = this.menu[this.current]
      console.log('[home] load linkInfo:', linkInfo);
      if(this.$route?.query?.current) return;

      this.$router.push({ name: linkInfo.pageName, params: linkInfo.params})
    },
    changeMenu(e) {
      console.log('sider menu e:', e);
      //this.current = e.key;
    }
  },
};
</script>
<style lang="less" scoped>
// 嵌套
#app-layout-sider {
  height: 100%;
  .logo {
    border-bottom: 1px solid #e8e8e8;
  }
  .pic-logo {
    height: 32px;
    //background: rgba(139, 137, 137, 0.2);
    margin: 10px;
  }
  .layout-sider {
    border-top: 1px solid #e8e8e8;
    border-right: 1px solid #e8e8e8;
  }
  .menu-item {
    .ant-menu-item {
      background-color: #fff;
      margin-top: 0px;
      margin-bottom: 0px;
      padding: 0 0px !important;
    }
  }
  .layout-content {
    //background-color: #fff;
  }
}
</style>
