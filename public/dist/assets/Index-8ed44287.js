import{s,i as e}from"./main-c6da19cc.js";import{i as a}from"./ipcRenderer-5e19eaee.js";import{_ as t,r as o,o as n,b as r,g as c,a as d,w as i,e as l,t as p,p as u,f as m}from"./index-880e867e.js";const f={data:()=>({status:0,progress:"",percentNumber:0}),mounted(){this.init()},methods:{init(){a.removeAllListeners(s.appUpdater),a.on(s.appUpdater,((s,e)=>{e=JSON.parse(e),this.status=e.status,3==e.status?(this.progress=e.desc,this.percentNumber=e.percentNumber):this.$message.info(e.desc)}))},checkForUpdater(){a.invoke(e.checkForUpdater).then((s=>{console.log(s)}))},download(){1===this.status?a.invoke(e.downloadApp).then((s=>{console.log(s)})):this.$message.info("没有可用版本")}}},h=s=>(u("data-v-88c3fe69"),s=s(),m(),s),k={id:"app-demo-window"},v=h((()=>c("div",{class:"one-block-1"},[c("span",null," 1. 自动更新 ")],-1))),b={class:"one-block-2"},g=h((()=>c("div",{class:"one-block-1"},[c("span",null," 2. 下载进度 ")],-1))),_={class:"one-block-2"};const w=t(f,[["render",function(s,e,a,t,u,m){const f=o("a-button"),h=o("a-space"),w=o("a-progress");return n(),r("div",k,[v,c("div",b,[d(h,null,{default:i((()=>[d(f,{onClick:e[0]||(e[0]=s=>m.checkForUpdater())},{default:i((()=>[l("检查更新")])),_:1}),d(f,{onClick:e[1]||(e[1]=s=>m.download())},{default:i((()=>[l("下载并安装")])),_:1})])),_:1})]),g,c("div",_,[d(w,{percent:u.percentNumber,status:"active"},null,8,["percent"]),d(h,null,{default:i((()=>[l(p(u.progress),1)])),_:1})])])}],["__scopeId","data-v-88c3fe69"]]);export{w as default};
