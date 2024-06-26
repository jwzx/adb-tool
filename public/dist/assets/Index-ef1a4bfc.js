import{i as e}from"./main-c6da19cc.js";import{i as a}from"./ipcRenderer-5e19eaee.js";import{_ as l,r as o,o as n,b as t,g as d,F as s,d as c,c as u,w as i,a as p,e as r,t as m,p as f,f as b}from"./index-c15ca858.js";const k={data:()=>({ips:[],adbHost:"",adbPort:"",packageName:"",ipHost:"",ipPort:"",connectInfo:"",command:""}),mounted(){this.init()},methods:{init(){a.invoke(e.getIps).then((e=>{this.ips=e,console.log(this.ips)})),this.adbConnect("devices"),this.adbConnect("getProxy")},handleInput(e){this[e.target.name]=e.target.value,this.$forceUpdate()},adbConnect(l){var o=this;let n={};switch(l){case"kill-server":case"disconnect":case"devices":case"packages":case"getProxy":case"clearProxy":n={action:l};break;case"monkey":case"clear":n={action:l,packageName:this.packageName};break;case"setProxy":n={action:"setProxy",ipHost:this.ipHost,ipPort:this.ipPort};break;case"command":n={action:l,command:this.command.replace(/adb/,"")};break;default:n={action:"connect",adbHost:this.adbHost,adbPort:this.adbPort}}a.invoke(e.adbConnect,n).then((e=>{switch(this.connectInfo=e.result.title+"\n"+e.result.result+"\n"+this.connectInfo,l){case"getProxy":case"clearProxy":let a=e.result.result.match(/[\d\.\:]+/)||[""];a=a[0].split(":")||[],o.ipHost=a[0]||"",o.ipPort=a[1]||"",o.$forceUpdate(),console.log(l,e.result.result);break;case"devices":let n=e.result.result.match(/[\d\.\:]+/)||[""];n=n[0].split(":")||[],o.adbHost=n[0]||"",o.adbPort=n[1]||"",o.$forceUpdate()}}))}}},v=e=>(f("data-v-63c83ecb"),e=e(),b(),e),_={id:"app-base-db"},h=v((()=>d("div",{class:"one-block-1"},[d("span",null," 1. 获取本机Ips ")],-1))),C={class:"one-block-2"},P=v((()=>d("div",{class:"one-block-1"},[d("span",null," 2. 连接adb ")],-1))),I={class:"one-block-2"},g=v((()=>d("div",{class:"one-block-1"},[d("span",null," 3. 打开应用 ")],-1))),V={class:"one-block-2"},H=v((()=>d("div",{class:"one-block-1"},[d("span",null," 4. 设置代理 ")],-1))),x={class:"one-block-2"},y=v((()=>d("div",{class:"one-block-1"},[d("span",null," 5. 自定义指令 ")],-1))),U={class:"one-block-2"},M=v((()=>d("div",{class:"one-block-1"},[d("span",null," 6. 连接日志 ")],-1))),N={class:"one-block-2"};const w=l(k,[["render",function(e,a,l,f,b,k){const v=o("a-col"),w=o("a-row"),j=o("a-input"),$=o("a-button"),F=o("a-textarea");return n(),t("div",_,[h,d("div",C,[(n(!0),t(s,null,c(b.ips,((e,a)=>(n(),u(w,{key:"ips"+a},{default:i((()=>[p(v,{span:10},{default:i((()=>[r(m(e.name)+": ",1)])),_:2},1024),p(v,{span:8},{default:i((()=>[r(m(e.address),1)])),_:2},1024)])),_:2},1024)))),128))]),P,d("div",I,[p(w,null,{default:i((()=>[p(v,{span:12},{default:i((()=>[p(j,{modelValue:b.adbHost,"onUpdate:modelValue":a[0]||(a[0]=e=>b.adbHost=e),modelModifiers:{value:!0},value:b.adbHost,name:"adbHost",onInput:a[1]||(a[1]=e=>k.handleInput(e)),"addon-before":"设备Ip"},null,8,["modelValue","value"])])),_:1}),p(v,{span:8},{default:i((()=>[p(j,{modelValue:b.adbPort,"onUpdate:modelValue":a[2]||(a[2]=e=>b.adbPort=e),modelModifiers:{value:!0},value:b.adbPort,name:"adbPort",onInput:a[3]||(a[3]=e=>k.handleInput(e)),"addon-before":"设备端口"},null,8,["modelValue","value"])])),_:1}),p(v,{span:4},{default:i((()=>[p($,{onClick:k.adbConnect},{default:i((()=>[r(" 连接 ")])),_:1},8,["onClick"])])),_:1}),p(v,{span:4},{default:i((()=>[p($,{onClick:a[4]||(a[4]=e=>k.adbConnect("kill-server"))},{default:i((()=>[r(" 清除服务 ")])),_:1})])),_:1}),p(v,{span:4},{default:i((()=>[p($,{onClick:a[5]||(a[5]=e=>k.adbConnect("disconnect"))},{default:i((()=>[r(" 断开连接 ")])),_:1})])),_:1}),p(v,{span:5},{default:i((()=>[p($,{onClick:a[6]||(a[6]=e=>k.adbConnect("devices"))},{default:i((()=>[r(" 查看连接设备 ")])),_:1})])),_:1}),p(v,{span:4},{default:i((()=>[p($,{onClick:a[7]||(a[7]=e=>k.adbConnect("packages"))},{default:i((()=>[r(" 获取应用列表 ")])),_:1})])),_:1})])),_:1})]),g,d("div",V,[p(w,null,{default:i((()=>[p(v,{span:12},{default:i((()=>[p(j,{modelValue:b.packageName,"onUpdate:modelValue":a[8]||(a[8]=e=>b.packageName=e),modelModifiers:{value:!0},name:"packageName",onInput:a[9]||(a[9]=e=>k.handleInput(e)),"addon-before":"应用包名"},null,8,["modelValue"])])),_:1}),p(v,{span:4},{default:i((()=>[p($,{onClick:a[10]||(a[10]=e=>k.adbConnect("monkey"))},{default:i((()=>[r(" 打开应用 ")])),_:1})])),_:1}),p(v,{span:4},{default:i((()=>[p($,{onClick:a[11]||(a[11]=e=>k.adbConnect("clear"))},{default:i((()=>[r(" 关闭应用 ")])),_:1})])),_:1})])),_:1})]),H,d("div",x,[p(w,null,{default:i((()=>[p(v,{span:12},{default:i((()=>[p(j,{modelValue:b.ipHost,"onUpdate:modelValue":a[12]||(a[12]=e=>b.ipHost=e),modelModifiers:{value:!0},value:b.ipHost,name:"ipHost",onInput:a[13]||(a[13]=e=>k.handleInput(e)),"addon-before":"代理Ip"},null,8,["modelValue","value"])])),_:1}),p(v,{span:8},{default:i((()=>[p(j,{modelValue:b.ipPort,"onUpdate:modelValue":a[14]||(a[14]=e=>b.ipPort=e),modelModifiers:{value:!0},value:b.ipPort,name:"ipPort",onInput:a[15]||(a[15]=e=>k.handleInput(e)),"addon-before":"代理端口"},null,8,["modelValue","value"])])),_:1}),p(v,{span:4},{default:i((()=>[p($,{onClick:a[16]||(a[16]=e=>k.adbConnect("setProxy"))},{default:i((()=>[r(" 设置代理 ")])),_:1})])),_:1}),p(v,{span:4},{default:i((()=>[p($,{onClick:a[17]||(a[17]=e=>k.adbConnect("getProxy"))},{default:i((()=>[r(" 获取代理 ")])),_:1})])),_:1}),p(v,{span:4},{default:i((()=>[p($,{onClick:a[18]||(a[18]=e=>k.adbConnect("clearProxy"))},{default:i((()=>[r(" 清除代理 ")])),_:1})])),_:1})])),_:1})]),y,d("div",U,[p(w,null,{default:i((()=>[p(v,{span:20},{default:i((()=>[p(j,{modelValue:b.command,"onUpdate:modelValue":a[19]||(a[19]=e=>b.command=e),modelModifiers:{value:!0},value:b.command,name:"command",placeholder:"shell pm list packages -3 ",onInput:a[20]||(a[20]=e=>k.handleInput(e)),"addon-before":"指令"},null,8,["modelValue","value"])])),_:1}),p(v,{span:4},{default:i((()=>[p($,{onClick:a[21]||(a[21]=e=>k.adbConnect("command"))},{default:i((()=>[r(" 执行 ")])),_:1})])),_:1})])),_:1})]),M,d("div",N,[p(w,null,{default:i((()=>[p(v,{span:24},{default:i((()=>[p(F,{value:b.connectInfo,rows:5,placeholder:"连接结果"},null,8,["value"])])),_:1})])),_:1})])])}],["__scopeId","data-v-63c83ecb"]]);export{w as default};
