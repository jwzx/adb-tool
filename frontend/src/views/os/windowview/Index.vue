<!--
 * @Description: 
 * @Author: jwzx
 * @Date: 2023-11-29 10:13:26
 * @LastEditTime: 2024-06-29 18:08:20
 * @LastEditors: jwzx
 * @FilePath: \adbTool\frontend\src\views\os\windowview\Index.vue
-->
<template>
  <div id="app-base-window-view">
    <div class="one-block-1">
      <span>
        1. 嵌入web内容
      </span>
    </div>  
    <div class="one-block-2">
      <a-space>
        <a-button @click="loadViewContent(0)">加载百度页面</a-button>
        <a-button @click="removeViewContent(0)">移除百度页面</a-button>
      </a-space>
    </div>
    <div class="one-block-1">
      <span>
        2. 嵌入html内容
      </span>
    </div>  
    <div class="one-block-2">
      <a-space>
        <a-button @click="loadViewContent(1)">加载html页面</a-button>
        <a-button @click="removeViewContent(1)">移除html页面</a-button>
      </a-space>
    </div>
  </div>
</template>
<script>
import { ipcApiRoute } from '@/api/main';
import { ipc } from '@/utils/ipcRenderer';
import { toRaw } from 'vue';

export default {
  data() {
    return {
      views: [
        {
          type: 'web',
          content: 'https://www.baidu.com/'
        },
        {
          type: 'html',
          content: '/public/html/view_example.html'
        },        
      ],
    };
  },
  methods: {
    loadViewContent (index) {
      ipc.invoke(ipcApiRoute.loadViewContent, toRaw(this.views[index])).then(r => {
        console.log(r);
      })
    },
    removeViewContent (index) {
      ipc.invoke(ipcApiRoute.removeViewContent, toRaw(this.views[index])).then(r => {
        console.log(r);
      })
    },
  }
};
</script>
<style lang="less" scoped>
#app-base-window-view {
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
