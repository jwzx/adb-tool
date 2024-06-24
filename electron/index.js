/*
 * @Description: 
 * @Author: jwzx
 * @Date: 2023-11-28 14:54:58
 * @LastEditTime: 2024-06-24 19:25:40
 * @LastEditors: jwzx
 * @FilePath: \adbTool\electron\index.js
 */
const { Application } = require('ee-core');
const path = require("path")

class Index extends Application {

  constructor() {
    super();
    // this === eeApp;
  }

  /**
   * core app have been loaded
   */
  async ready() {
    // do some things
  }

  /**
   * electron app ready
   */
  async electronAppReady() {
    // do some things
  }

  /**
   * main window have been loaded
   */
  async windowReady() {
    // do some things
    // 延迟加载，无白屏
    const winOpt = this.config.windowsOption;
    if (winOpt.show == false) {
      const win = this.electron.mainWindow;
      win.once('ready-to-show', () => {
        win.maximize()
        win.show();
        win.focus();
      })
      if (this.config.env == "local") {
        // win.on("ready", async () => {
          // if (isDevelopment && !process.env.IS_TEST) {
            // Install Vue Devtools
            // try {
            //   let { session } = require("electron")

            //   session.defaultSession.loadExtension(path.join(process.cwd(), "_devtools/vue-devtools-6.6.3_2"), { allowFileAccess: true }).then(val => {
            //     console.log(val)
            //   }).catch(e => {
            //     console.error("devTool", e)
            //   })
            //   // await installExtension(VUEJS3_DEVTOOLS);
            // } catch (e) {
            //   console.error("Vue Devtools failed to install:", e.toString());

            // }
          // }
        // })

      }
    }
  }

  /**
   * before app close
   */  
  async beforeClose() {
      // do some things

    }
  }

Index.toString = () => '[class Index]';
module.exports = Index;